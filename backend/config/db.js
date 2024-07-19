import mongoose from "mongoose";
import dotenv from "dotenv";
import Grid from 'gridfs-stream';
dotenv.config();

const connectDB = async() => {
    try {
        console.log('connect db')
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) { 
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }

}

export default connectDB; 
