import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { authorRoute } from './services/routes/author.route.js';
import { blogpostRoute } from "./services/routes/blogpost.route.js";
import cors from "cors";
import { emailsender } from "./services/middlewares/emailsender.js";

config();

const app = express()
const port = process.env.PORT || 3001;
app.use(cors());

app.use(express.json());

app.use("/authors", authorRoute);

app.use("/blogPosts", blogpostRoute);

const initserver = async () => {
    try {
        await mongoose.connect(process.env.DBURL);

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
          })
    } catch (err) {
        console.log("Server connection failed ", err)
    }
}

initserver();