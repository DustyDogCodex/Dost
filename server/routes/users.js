const express = require('express')
const asyncHandler = require('express-async-handler')
const Router = express.Router()

//importing user model
const User = require('../models/Users')

//route for getting user info
Router.get("/:id",
    asyncHandler(async(req,res) => {
        //get id from query params
        const { id } = req.params

        //find user in database
        const user = await User.findById({ id })

        //send info to front-end
        res.status(200).json(user)
    })
)

//route for getting user's friend list
Router.get("/:id/friends",
    asyncHandler(async(req,res) => {
        //get id from query params
        const { id } = req.params

        //find user in database
        const user = await User.findById({ id })

        //use user's friendlist to identify other users who are user's friends
        //using Promise.all() to send multiple api calls to grab all info for all associated user id's in this user's friendlist
        const friends = await Promise.all(
            user.friendList.map((id) => User.findById(id))
        )

        //each user object in friends is now destructured to extract only the relevant information we need to display in the friends widget on the user's homepage
        const relevantFriendsInfo = friends.map(
            ({ _id, firstName, lastName, profilePic, location }) => {
                return { _id, firstName, lastName, profilePic, location }
            }
        )

        //send relevant friend info to front-end
        res.status(200).json(relevantFriendsInfo)
    })
)

module.exports = Router