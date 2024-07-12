import mongoose, { Schema } from "mongoose";

const postSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
    },

    content: {
        type: String, 
        required: true, 
    },

    comments: [{
        type: Schema.Types.ObjectId, 
        ref: "Comment",
    }],

    likes: [{
        type: Schema.Types.ObjectId, 
        ref: "User",
    }],

    caption: {
        type: String,
        required: false,
    },
}, 
{ timestamps: true},
{ collection: "posts"},
);

const Post = mongoose.model("Post", postSchema);

export default Post;