const mongoose = require('mongoose')
const Post = require("../models/Posts")
const User = require("../models/Users")
const asyncHandler = require('express-async-handler')

/* ------- Create new post -------- */

const createNewPost = asyncHandler(
    async(req,res) => {
        const { userId, postText, picturePath } = req.body

        //find user using userId
        const user = await User.findById(userId)

        //creating a new post with information from req
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            postText,
            userProfilePic: user.profilePic,
            picturePath,
            likes: {},
            comments: []
        })

        //saving new post
        await newPost.save()

        console.log("uploaded file path", picturePath)

        res.json(userId, postText, picturePath)
    }
)

module.exports = { createNewPost }