import asyncHandler from "express-async-handler";
import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const addComment = asyncHandler(async (req, res) => {
    // const { userId, postId, content } = req.body;
    const { content } = req.body;
    const postId = req.params.postId; 
    const user = req.user;
    
    const post = await Post.findById(postId);
    
    if (!post) {
        res.status(404);
        throw new Error("Post not found. Please try again.");
    }

    const comment = await Comment.create({
        user: user.id,
        post: postId,
        content: content,
    });
    
    if (comment) {
        post.comments.push(comment._id);
        await post.save(); 

        console.log(`Comment with content ${comment.content} added to post with id ${post._id} by user ${comment.user}`)

        res.status(201).json({
            message: "Comment added successfully.",
        });

    } else {
        throw new Error("Invalid comment data. Please try again.");
    }
});


const getCommentsForPost = asyncHandler(async (req, res) => {
    const postId = req.params.id; 
    const post = await Post.findById(postId).populate("comments");

    if (post) { 
        console.log(`Comments for post with id ${postId}: ${post.comments}`)
        res.status(200).json(post.comments); 
    } else {
        res.json({ message: "Post not found." });
    }

}); 


const deleteComment = asyncHandler(async (req, res) => {

    const commentId = req.params.id; 
    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new Error("Comment not found. Please try again.");
    }

    const commentUser = await User.findById(comment.user);
    const reqUser = req.user;

    if (commentUser._id.toString() !== reqUser._id.toString()) {
        throw new Error("You are not authorized to delete this comment.");
    }

    if (comment && commentUser && reqUser) {
        
        const post = await Post.findById(comment.post);
        post.comments = post.comments.filter(comment => comment.toString() !== commentId);
        await post.save();

        await Comment.deleteOne({ _id: commentId });

        const user = await User.findById(comment.user);
        console.log(`Comment with id ${commentId} deleted from post ${post} by user ${user.username}.`)

        res.status(200).json({ message: "Comment deleted successfully." });
    } else {
        throw new Error ("Comment not found. Please try again.");
    }

});
export { 
    addComment,
    getCommentsForPost,
    deleteComment,
};

