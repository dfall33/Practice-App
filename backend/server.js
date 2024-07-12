import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db.js';

import cookieParser from 'cookie-parser';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

console.log('start')
dotenv.config(); 
connectDB();

const PORT = process.env.PORT || 5000; 

const app = express(); 
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser()); 

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req, res) => res.send("Server is ready"))

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

app.use(notFound);
app.use(errorHandler);