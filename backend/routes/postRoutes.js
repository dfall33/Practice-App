import express from "express";
import {
    addPost,
    getPosts,
    deletePost,
} from "../controllers/postController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/', protect, addPost);
router.get('/:username', getPosts);
router.delete('/:id', protect, deletePost);
export default router;