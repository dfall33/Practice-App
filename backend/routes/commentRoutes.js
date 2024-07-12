import express from "express";
import {
    addComment,
    getCommentsForPost,
    deleteComment,

} from "../controllers/commentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router(); 

router.get('/:postId', getCommentsForPost);
router.post('/:postId', protect, addComment);
router.delete('/:id', protect, deleteComment);

export default router; 