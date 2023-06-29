const express = require('express')
const asyncHandler = require('express-async-handler')
const Router = express.Router()

//import posts model
const Post = require('../models/Posts')

//route for getting posts for a user's homepage/feed 
Router.get("/", 
    asyncHandler(async(req,res) => {

    })
)

//route for getting posts created by a particular user
Router.get("/:userId/posts")

//maybe a basic like/unlike functionality?
Router.patch("/:id/like")

module.exports = Router