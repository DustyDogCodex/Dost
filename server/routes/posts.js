const express = require('express')
const asyncHandler = require('express-async-handler')
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

//maybe a basic like/unlike functionality?
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

module.exports = Router