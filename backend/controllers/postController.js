import expressAsyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const addPost = expressAsyncHandler(async (req, res) => {

    const url = req.url; 
    const description = req.body.description;
    const userId = req.body._id;

    const user = await User.findById(userId);

    // console.log(`IN POSTCONTROLLER: File: , Description: ${description}, User: ${userId}, user: ${user}  `)
    
    const post = await Post.create({
        user: userId,
        content: url,
        caption: description
    })

    if (post) {
        user.posts.push(post._id);
        await user.save(); 

        console.log(`User updated posts: ${user.posts} by user ${user.username}`)
        
        res.status(201).json({
            message: "Post added successfully.",
        })
    } else {
        res.status(400);
        throw new Error("Invalid user or post data. Please try again.")
    }
});


const getPosts = expressAsyncHandler(async (req, res) => {
    console.log('Get posts route')
    const username = req.params.username;
    const posts = await User.findOne({ username }).populate("posts");

    if (posts) {
        console.log(`Posts: ${posts}, for user: ${username}`)
        res.status(200).json(posts);
    } else {
        res.status(404);
        throw new Error("User not found. Please try again.")
    }
});


const deletePost = expressAsyncHandler(async (req, res) => {

    console.log('Delete post route')
    const postId = req.params.id;
    const post = await Post.findById(postId);

    const postUser = await User.findById(post.user);
    const reqUser = req.user;

    if (!post) {
        throw new Error("Post not found. Please try again.");
    }

    if (reqUser._id.toString() !== postUser._id.toString()) {
        throw new Error("You are not authorized to delete this post.");
    }

    if (postUser && reqUser && post) {

        console.log("deleting post")
        // await Comment.deleteMany({ post: post._id });

        console.log('comments deleted')
        const user = req.user;

        user.posts = await user.posts.filter(p => p.toString() !== post._id.toString());
        await user.save();
        
        await Post.deleteOne({ _id: postId})

        console.log(`User ${user.username} deleted posts. Posts now = ${user.posts}`)

        res.status(200).json({ message: "Post deleted successfully."});

    } else {
        throw new Error("Post not found. Please try again.");
    }
}); 

const getIndividualPost = expressAsyncHandler(async (req, res) => { 

    console.log('Ind.Post route')
    const postId = req.params.id;
    const post = await Post.findById(postId);
    console.log(`Post: ${post}`)

    if (post)
        res.status(200).json(post);
    else 
        throw new Error("Post not found. Please try again.")
})

export {
    addPost,
    getPosts,
    deletePost,
    getIndividualPost
}