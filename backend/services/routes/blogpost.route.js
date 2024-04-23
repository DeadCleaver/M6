import { Router } from "express";
import Blogpost from "../models/blogpost.model.js";
import { uploadCover } from "../middlewares/multer.js";

export const blogpostRoute = Router();

/* chiamata get di tutti i post */
blogpostRoute.get("/", async (req, res, next) => {
    try {
      const posts = await Blogpost.find();
      res.json(posts);
    } catch (err) {
      next(err);
    }
  });

  /* chiamata POST di un blogpost */
  blogpostRoute.post("/", async (req, res, next) => {
    try {
      let post = await Blogpost.create(req.body);
      res.send(post).status(400);
    } catch (err) {
      next(err);
    }
  });

  /* chiamata get di un singolo blogpost */
  blogpostRoute.get("/:id", async (req, res, next) => {
    try {
      let post = await Blogpost.findById(req.params.id);
      res.send(post);
    } catch (err) {
      next(err);
    }
  });

  /* Chiamata delete di un blogpost */
  blogpostRoute.delete("/:id", async (req, res, next) => {
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
  blogpostRoute.put("/:id", async (req, res, next) => {
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
      let updatedCover = await  Blogpost.findByIdAndUpdate(
        req.params.id,
        {cover: req.file.path},
        {new: true}
      )
      res.send(updatedCover);
    } catch(err) {
      next(err);
    }
  })

  /* COMMENTI */

  
  



