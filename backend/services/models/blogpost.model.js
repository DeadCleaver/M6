import { Schema, model } from "mongoose";

const blogPostSchema = new Schema(
    {
        category: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        cover: {
            type: String,
            required: false
        },
        readingtime: {
            value: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                required: true
            }

        },
        author: {
            type: Schema.Types.ObjectId, 
            ref: 'Author' 
        },
        content: {
            type: String,
            required: true
        },
        comments: [{
            user: {
                type: Schema.Types.ObjectId, 
                ref: 'Author',
                required: true
            },
            comment: {
                type: String,
                required: true
            }, 
            createdAt: {
                type: Date, 
                default: Date.now
            }
        }]
    },
     {
        collection: "blogposts"
    }
);

export default model("Blogpost", blogPostSchema);
