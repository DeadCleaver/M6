import { Router } from "express";
import Blogpost from "../models/blogpost.model.js";
import { uploadCover } from "../middlewares/multer.js";
import { authMiddleware } from "../auth/index.js";
import { Types } from "mongoose";

export const blogpostRoute = Router();

/* chiamata get di tutti i post */
blogpostRoute.get("/", async (req, res, next) => {
  try {
    const posts = await Blogpost.find().populate(`author`);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

/* chiamata POST di un blogpost */
blogpostRoute.post("/", authMiddleware, async (req, res, next) => {
  try {
    let post = await Blogpost.create({
      ...req.body,
      author: req.user.id
    });
    res.send(post).status(400);
  } catch (err) {
    next(err);
  }
});

/* chiamata get di un singolo blogpost */
blogpostRoute.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    let post = await Blogpost.findById(req.params.id);
    res.send(post);
  } catch (err) {
    next(err);
  }
});

/* Chiamata delete di un blogpost */
blogpostRoute.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    await Blogpost.deleteOne({
      _id: req.params.id,
    });
    res.send("Il post è stato eliminato correttamente").status(204);
  } catch (err) {
    next(err);
  }
});

/* chiamata put di un blogpost */
blogpostRoute.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    let post = await Blogpost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(post);
  } catch (err) {
    next(err);
  }
});

/* richiesta PATCH per l'immagine cover del post */
blogpostRoute.patch("/:id/cover", uploadCover, async (req, res, next) => {
  try {
    let updatedCover = await Blogpost.findByIdAndUpdate(
      req.params.id,
      { cover: req.file.path },
      { new: true }
    );
    res.send(updatedCover);
  } catch (err) {
    next(err);
  }
});

/* COMMENTI */

/* visualizza tutti i commenti di un post*/
blogpostRoute.get("/:id/comments", async (req, res, next) => {
  try {
    let postComments = await Blogpost.findById(req.params.id).select(`comments`).populate(`comments.user`);
    res.send(postComments);
  } catch (error) {
    next(err);
  }
});

/* aggiunge un commento */

blogpostRoute.post("/:id/", authMiddleware, async (req, res, next) => {
  try {
    const post = await Blogpost.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Post non trovato");
    }

    post.comments.push({
      user: req.user.id,
      comment: req.body.comment,
    });

    await post.save();

    res.status(201).send(post);
  } catch (err) {
    next(err);
  }
});

/* modifica un commento */
blogpostRoute.put("/:id/comments/:commentId", authMiddleware, async (req, res, next) => {
  try {
    let post = await Blogpost.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post non trovato");
    }
    
    let singleComment = post.comments.id(req.params.commentId);
    if (!singleComment) {
      return res.status(404).send("Commento non trovato");
    }

    // Modifica il commento specificato con i nuovi dati
    singleComment.user = req.body.user;
    singleComment.comment = req.body.comment;
    
    // Salva il post con il commento modificato
    await post.save();
    
    res.send(singleComment);
  } catch (err) {
    next(err);
  }
});

blogpostRoute.delete("/:id/comments/:commentId", authMiddleware, async (req, res, next) => {
  try {
    let post = await Blogpost.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post non trovato");
    }
    
    let singleComment = post.comments.id(req.params.commentId);
    if (!singleComment) {
      return res.status(404).send("Commento non trovato");
    }

    // Elimina il commento
    singleComment.deleteOne();
    
    // Salva il post con il commento modificato
    await post.save();
    
    res.status(204).send();
    res.send(post);
  } catch (err) {
    next(err);
  }
});

/* visualizza un commento specifico */
blogpostRoute.get("/:id/comments/:commentId", async (req, res, next) => {
  try {
    let post = await Blogpost.findById(req.params.id);
    
    let comment = post.comments.id(req.params.commentId);

    res.send(comment);
  } catch (error) {
    next(err);
  }
});

/* modifica un commento */


/* SCRIPT PER AGGIORNARE I VECCHI BLOGPOSTS */
/* blogpostRoute.get("/update", async (req, res, next) => {
  try {
    const posts = await Blogpost.find();

    for (let post of posts) {
      post.comments = [];
      await post.save();
      console.log(post);
    }
    res.send("update eseguito");
  } catch(err) {
    console.error(err);
    next(err);
  }
}); */


/* vecchio add comment */
/* blogpostRoute.post("/:id/", async (req, res, next) => { 
  try {
    // Trova il post tramite id
    let post = await Blogpost.findById(req.params.id);
    // check che il post ci sia
    if (!post) {
      return res.status(404).send("Post non trovato");
    }
    // aggiunge il commento all'array
    post.comments.push({ user: req.body.user, comment: req.body.comment });

    await post.save();

    res.status(201).send(post.comments);
  } catch (err) {
    next(err);
  }
}); */