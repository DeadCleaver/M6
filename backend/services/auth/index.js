import jwt from "jsonwebtoken";
import Author from "../models/author.model.js";
import { config } from "dotenv";

config();

// genera un token con JWT
export const generateJWT = (payload) => {
  return new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1 day" },
      (err, token) => {
        if (err) rej(err);
        else res(token);
      }
    )
  );
};

// Funzione per verificare la validità del token
export const verifyJWT = (token) => {
  return new Promise((res, rej) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        rej(err);
      } else {
        res(decoded);
      }
    });
  });
};

// Middleware da utilizzare nelle richieste che necessitano l'autorizzazione
export const authMiddleware = async (req, res, next) => {
  try {
    // Non è stato fornito il token nell'header
    if (!req.headers.authorization) {
      res.status(401).send("Effettua il login");
    } else {
      const decoded = await verifyJWT(
        req.headers.authorization.replace("Bearer ", "")
      );

      if (decoded.exp) {
        delete decoded.iat;
        delete decoded.exp;
        const me = await Author.findOne({
          ...decoded,
        });

        if (me) {
          req.user = me;
          next();
        } else {
          res.status(401).send("Utente non trovato");
        }
      } else {
        res.status(401).send("Eddettua di nuovo il login");
      }
    }
  } catch (err) {
    next(err);
  }
};
