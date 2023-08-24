const Post = require("../models/Posts")
const User = require("../models/Users")
const asyncHandler = require('express-async-handler')
const fs = require('fs')

/* ------- Create new post --------------------------- */

const createNewPost = asyncHandler(
    async(req,res) => {
        const { userId, description } = req.body

        //find user using userId
        const user = await User.findById(userId)

        //checking for uploaded file. 
        const postImage = req.file ? req.file.filename : ''

        //creating a new post with information from req
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userProfilePic: user.profilePic,
            imagePath: postImage,
            likes: [],
            comments: []
        })

        //saving new post
        await newPost.save()

        res.status(200).send(newPost)
    }
)

/* ------------ Update Post ------------------------- */

const updatePost = asyncHandler(
    async(req,res) => {
        //get postId from params
        const { postId } = req.params

        //getting editted description and image from req body
        const { description, newImage } = req.body
        
        //finding relevant post
        const post = await Post.findById(postId)

        let updatedImagePath = post.imagePath

        //if newImage was uploaded or previous image was removed, delete prev image 
        if( newImage ){
            //if there's an image with the post, delete that image. if no image, skip to next step
            if(post.imagePath){
                //delete prev image if new image is uploaded
                fs.unlink('uploadedImages/' + post.imagePath, (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
            }

            //set updatedImagePath to new image path or empty string if undefined
            //if req.file is undefined with newImage being true, the user has deleted the associated image 
            updatedImagePath = req.file ? req.file.filename : ''
        }

        //find and update post after deleting associated images
        await Post.findByIdAndUpdate(
            postId,
            { description, imagePath: updatedImagePath },
            { new: true }
        )

        res.status(200).send('updated')
    }
)

module.exports = { createNewPost, updatePost }