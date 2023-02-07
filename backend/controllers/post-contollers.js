import mongoose from "mongoose";
import Post from "../models/Post";
import User from "../models/User";

export const getAllPosts = async(req, res) => {
    let posts;
    try {
        posts = await Post.find();
    } catch (error) {
        return console.log(error);
    }
    if(!posts) {
        res.status(500).json({message: "Something went wrong"});
    }
    res.status(200).json({posts});
};

export const addPost = async(req, res) => {
    const {title, description, image, location, date, user} = req.body;

    if(!title && title.trim() === "" && !description && description.trim() ==="" && !image && image.trim()==="" && !location && location.trim()==="" && !user && !date){
        return res.status(422).json({message: "Invalid Data"});
    }

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(error)
    }
    if(!existingUser) {
        return res.status(404).json({message: "User not found"});
    }
    let post;
    
    try {
        post = new Post({title, description, image, location, date: new Date(`${date}`), user});

        const session = await mongoose.startSession();
        session.startTransaction();
        existingUser.posts.push(post);
        await existingUser.save({ session });
        post = await post.save({ session });
        session.commitTransaction();
    } catch (error) {
       return console.log(error);
    }
    if(!post) {
        return res.status(500).json({message: "Unexpected error occured"});
    }
    return res.status(201).json({post});
};

export const getPostById = async(req, res) => {
    const id = req.params.id;
    let post;
    try {
        post = await Post.findById(id);
    } catch (error) {
        return console.log(error)
    }
    if(!post) {
        return res.status(404).json({message: "No post found"});
    }
    return res.status(200).json({ post });
};

export const updatePost = async(req, res) => {
    const id = req.params.id;
    const {title, description, image, location} = req.body;

    if(!title && title.trim() === "" && !description && description.trim() ==="" && !image && image.trim()==="" && !location && location.trim()===""){
        return res.status(422).json({message: "Invalid Data"});
    }
    let post;
    try {
        post = await Post.findByIdAndUpdate(id, {
            title, description, image, location
        });
    } catch (error) {
        return console.log(error);
    }
    if(!post) {
        return res.status(500).json({message: "Unable to update"});
    }
    return res.status(200).json({ message: "Updated successfully" });
} 

export const deletePost = async(req, res) => {
    const id = req.params.id;
    let post;
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        post = await Post.findById(id).populate("user");
        post.user.posts.pull(post);
        await post.user.save({ session });
        post = await Post.findByIdAndRemove(id);
        session.commitTransaction();
    } catch (error) {
        return console.log(error);
    }
    if(!post) {
        return res.status(500).json({ message: "Unable to delete"});
    }
    return res.status(200).json({message: "Deleted Successfully"});
};