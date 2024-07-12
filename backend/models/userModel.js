import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const salt_rounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true, 
    },

    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String, 
        required: true, 
        unique: true
    },

    password: {
        type: String, 
        required: true, 
    },

    bio: {
        type: String,
        required: false, 
        default: ''
    }, 

    profilePicture: {
        type: String, 
        required: false,
        default: ''
    },

    gender: {
        type: String, 
        required: false,
        default: ''
    },

    followers: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],

    following: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],

    posts: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    ],

}, 
{ timestamps: true},
{ collection: "users" });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(salt_rounds);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema); 

export default User; 