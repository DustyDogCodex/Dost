const Post = require("../models/Posts")
const User = require("../models/Users")
const asyncHandler = require('express-async-handler')

/* ------- Create new post --------------------------- */

const createNewPost = asyncHandler(
    async(req,res) => {
        const { userId, description } = req.body

        //find user using userId
        const user = await User.findById(userId)

        //creating a new post with information from req
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userProfilePic: user.profilePic,
            imagePath: req.file.filename,
            likes: [],
            comments: []
        })

        //saving new post
        await newPost.save()

        res.status(200).send(newPost)
    }
)

/* ------------ Update a Post ------------------------- */

const updatePost = asyncHandler(
    async(req,res) => {
        //get postId from params
        const { postId } = req.params

        //getting description from req body
        const { description, newImage } = req.body

        //checking for uploaded image
        let newImagePath

        if(newImage){
            newImagePath = req.file.filename
        } else {
            newImagePath = ''
        }

        //find and update post
        const updatedPost = Post.findByIdAndUpdate(postId,
                { description, }
            )

        res.status(200).send(updatedPost)
    }
)

module.exports = { createNewPost, updatePost }