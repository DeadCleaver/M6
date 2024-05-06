import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { authorRoute } from './services/routes/author.route.js';
import { blogpostRoute } from "./services/routes/blogpost.route.js";
import { authRoute } from "./services/routes/auth.route.js";
import cors from "cors";
import { emailsender } from "./services/middlewares/emailsender.js";
import { authMiddleware } from "./services/auth/index.js";

config();

const app = express() //creo l'istanza del server
const port = process.env.PORT || 3001; //inizializzo la porta
app.use(cors());

app.use(express.json()); //abilitiamo l'uso dei json nelle richies

app.use("/auth", authRoute);
app.use("/blogPosts", blogpostRoute);
app.use("/authors", authorRoute);


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