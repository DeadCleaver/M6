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
    },
    birthdate: {
      type: Date,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    collection: "authors",
  }
);

export default model("Author", authorSchema);
