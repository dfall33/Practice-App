import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import Post from '../models/postModel.js';
import Comment from '../models/commentModel.js';

const authUser = expressAsyncHandler(async (req, res) => {

    const { email, password } = req.body; 
    const user = await User.findOne({ email }); 

    if (user && user.matchPassword(password)) { 
        generateToken(res, user._id); 
        res.status(200).json({
            _id: user._id, 
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(401);
        throw new Error("Invalid credentials: check email and / or password for login.")
    }
});

const registerUser = expressAsyncHandler(async (req, res) => {

    console.log('register user')
    const { name, email, password, bio, profilePicture, gender, username } = req.body;

    console.log(`name: ${name}, email: ${email}, password: ${password}, bio: ${bio}, profilePicture: ${profilePicture},`)
    
    const userExists = await User.findOne({ email })

    if (userExists) {
        // res.status(400).json({ message: "User alaready exists."})
        throw new Error ("User already exists. Please use a different email address.")
    }

    const user = await User.create({
        name, 
        username, 
        email, 
        password, 
        bio, 
        profilePicture,
        gender
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id, 
            name: user.name, 
            email: user.email 
        })
    } else {
        res.status(400); 
        throw new Error ("Invalid user data. Make sure all fields are filled out correctly.")
    }
})


const logoutUser = expressAsyncHandler(async (req, res) => {
    res.cookie('jwt', 'none', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: `User ${req.user.name} has been logged out.`})
});

const getUserProfile = expressAsyncHandler(async (req, res) => {
    // const user = {
    //     _id: req.user._id,
    //     name: req.user.name,
    //     email: req.user.email,
    // }

    const username = req.params.username; 
    const user = await User.findOne({ username }).select('-password');

    if (!user) {
        throw new Error ("User not found: check the username and try again.")
    }

    res.status(200).json(user);

});

const updateUserProfile = expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.bio = req.body.bio || user.bio;
        user.profilePicture = req.body.profilePicture || user.profilePicture;
        user.gender = req.body.gender || user.gender; 
    } else {
        // res.status(404); 
        throw new Error("User not found: check the user ID and try again.")
    }

    await user.save();
    res.status(200).json({ message: `User ${user.name}'s profile updated successfully.`});


});


const deleteUser = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    
    if (user) {
        await Post.deleteMany({ user: user._id });
        await Comment.deleteMany({ user: user._id });

        await User.deleteOne({ _id: user._id });

        res.status(200).json({ message: `User ${user.name} deleted successfully.`})
    }

    else {
        throw new Error ("Something went wrong. Please try again.");
    }
}); 

export { 
    authUser, 
    registerUser, 
    logoutUser, 
    getUserProfile, 
    updateUserProfile, 
    deleteUser,
}
