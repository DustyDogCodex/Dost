const express = require('express')
const asyncHandler = require('express-async-handler')
const fs = require('fs')
const Router = express.Router()

//import posts model
const Post = require('../models/Posts')

//route for getting posts for a user's homepage/feed 
Router.get("/", 
    asyncHandler(async(req,res) => {
        //grab all post from database and send it to front-end
        const userFeed = await Post.find()
        res.status(200).send(userFeed)
    })
)

//route for getting posts created by a particular user
Router.get("/:userId",
    asyncHandler(async(req,res) => {
        //grab userId from query params
        const { userId } = req.params

        //find posts with associated userId
        const userPosts = await Post.find({ userId })

        //send userPosts as response to front-end
        res.status(200).json(userPosts)
    })
)

//route for liking/unliking a post
Router.patch("/:id/like",
    asyncHandler(async(req,res) => {
        //grab post id from query params
        const { id } = req.params

        //grab userId from req body
        const { userId } = req.body
        
        //find relevant post in our database
        const post = await Post.findById(id)

        //if user has previously liked the post, their userId will exist inside the likes array
        const likedOrNaw = post.likes.includes(userId) 

        //if userId exists in the array, delete userId from array or else add it to array
        //this is equivalent to unliking the post if already liked, else like the post
        if(likedOrNaw){
            //filtering likes array to remove userId
            post.likes = post.likes.filter(id => id !== userId)            
        } else {
            //if userId does not exist in likes array, userId is pushed into the array 
            post.likes.push(userId)
        }

        //update selected post
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true}
        )
        
        res.status(200).json(updatedPost)
    })
)

//route for adding a comment to a post
Router.post("/:id/comment",
    asyncHandler(async(req,res) => {
        //grab post id from query params
        const { id } = req.params

        //grab author for the comment from req body and comment text from data object
        const { author } = req.body
        const { comment } = req.body.data
             
        //find relevant post in our database
        const post = await Post.findById(id)

        //updating comments object for the post
        const updatedComments = [ ...post.comments, { author, comment }]
        
        //update selected post with updateComments
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { comments: updatedComments },
            { new: true}
        )
        
        //respond with updatedPosts.comments so frontend can use res.data to update comments being displayed
        res.status(200).json(updatedPost.comments)
    })
)

//route for getting info for editting a post
Router.get("/edit/:postId",
    asyncHandler(async(req,res) => {
        //get postId from params
        const { postId } = req.params
        
        //find relevant post
        const post = await Post.findById(postId)

        //sending post description and imagePath to frontend for editting
        const description = post.description
        const imagePath = post.imagePath

        //send description and image path from post to front end
        res.status(200).send({description, imagePath})
    })
)

//route for deleting a post
Router.delete("/delete/:postId",
    asyncHandler(async(req,res) => {
        //get postId from params
        const { postId } = req.params
        
        //find relevant post
        const post = await Post.findById(postId)

        //delete images associated with post
        if(post.imagePath){
            //delete files from server
            fs.unlink('uploadedImages/' + post.imagePath, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        }
        
        //after images are deleted, delete selected post from database
        await Post.findByIdAndDelete(postId)

        res.status(200)
    })
)

module.exports = Router