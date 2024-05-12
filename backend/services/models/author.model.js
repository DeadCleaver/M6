import { Schema, model } from "mongoose";

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    }, 
    password: { // campo della password inserito per auth
      type: String,
      required: false
    },
    birthdate: {
      type: Date,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    googleid: {
      type: String,
      required: false
    }
  },
  {
    collection: "authors",
  }
);

export default model("Author", authorSchema);
