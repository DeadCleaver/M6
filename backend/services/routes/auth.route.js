import { Router } from "express";
import bcrypt from "bcryptjs";
import Author from "../models/author.model.js";
import { generateJWT } from "../auth/index.js";
import passport from "passport";

export const authRoute = Router();

authRoute.post("/register", async (req, res, next) => {
  try {
    let user = await Author.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    });

    //sendEmail qui?

    res.send(user);
  } catch (err) {
    next(err);
  }
});

authRoute.post("/login", async (req, res, next) => {
  try {
    let authorFound = await Author.findOne({
      email: req.body.email,
    });

    if (authorFound) {
      const isPasswordMatching = await bcrypt.compare(
        req.body.password,
        authorFound.password
      );

      if (isPasswordMatching) {
        const token = await generateJWT({
          lastname: authorFound.lastname,
          email: authorFound.email,
        });

        res.send({ user: authorFound, token });
      } else {
        res.status(400).send("Password sbagliata");
      }
    } else {
      res.status(400).send("Utente non trovato");
    }
  } catch (err) {
    next(err);
  }
});

/* GOOGLE LOGIN */

authRoute.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRoute.get(
  "/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    try {
      res.redirect(`http://localhost:3000/verifylogin?token=${req.user.token}`); // reinderizzare a home?
    } catch (err) {
      next(err);
    }
  }
);
