import jwt, { decode } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt; 
    
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            console.log(`req.user: ${req.user.username}`)
            next();
        } catch (error) {
            res.status(401);
            throw new Error ('Not authorized, token failed')
        }
    
    } else {
        res.status(401);
        throw new Error('Not authorized, no token')
    }
});

export { protect };