import express from "express";
import multer from "multer";
import {
    addPost,
    getPosts,
    deletePost,
    getIndividualPost
} from "../controllers/postController.js";

import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

console.log('post routes')
router.post('/', upload.single('content'), protect, addPost);
console.log('post routes')

router.get('/users/:username', getPosts);
console.log('post routes')

router.delete('/:id', protect, deletePost);
console.log('post routes')

router.get('/:id', getIndividualPost);
console.log('post routes')

export default router;