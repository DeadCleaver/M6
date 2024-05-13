import GoogleStrategy from "passport-google-oauth20";
import Author from "../models/author.model.js";
import { generateJWT } from "./index.js";
import { config } from "dotenv";

config();

const options = {
  clientID: process.env.G_CLIENT_ID,
  clientSecret: process.env.G_CLIENT_SECRET,
  callbackURL: process.env.G_CB,
};

const googleStrategy = new GoogleStrategy(
  options,
  async (_, __, profile, passportNext) => {
    try {

      const { email, given_name, family_name, sub, birthday, picture } = profile._json;

      const foundAuthor = await Author.findOne({ email });

      if (foundAuthor) { // se l'utente esiste creiamo il token

        /* const token = await createAccessToken({ //questa funzione non esiste
                _id_: user._id
            }) */

        const token = await generateJWT({
          lastname: family_name,
          email: email,
        });

        passportNext(null, {token});
      } else {
        const newAuthor = new Author({
          name: given_name,
          lastname: family_name,
          email: email,
          googleid: sub,
          birthdate: birthday,
          avatar: picture,
        });
      

      await newAuthor.save(); //cambiare in author?

      const token = await generateJWT({
        // i dati per creare il JWT come ho fatto fino ad ora
        lastname: family_name,
        email: email,
      });

      passportNext(null, {token})

    }
    } catch (err) {
        console.log(err); 
        passportNext(err); 
    }
  }
);

export default googleStrategy;
