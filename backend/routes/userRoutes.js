import express from "express";
import {
    authUser, 
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    deleteUser
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

// initalize a router with express 
const router = express.Router(); 

// define user routes using initialized router 
router.post('/', registerUser); // post to /api/users to regiser user 
router.post('/login', authUser); // post to /api/users/login to login user
router.get('/profile/:username', getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.post('/logout', protect, logoutUser);
router.delete('/delete', protect, deleteUser);

export default router;