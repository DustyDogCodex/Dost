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
        const user = await User.findById(id)

        //send info to front-end
        res.status(200).json(user)
    })
)

//route for getting user's friend list
Router.get("/friends/:id",
    asyncHandler(async(req,res) => {
        //get id from query params
        const { id } = req.params

        //find user in database
        const user = await User.findById(id)

        //use user's friendlist to identify other users who are user's friends
        //using Promise.all() to send multiple api calls to grab all info for all associated user id's in this user's friendlist
        const friends = await Promise.all(
            user.friendsList.map((id) => User.findById(id))
        )

        //each user object in friends is now destructured to extract only the relevant information we need to display in the friends widget on the user's homepage
        const relevantFriendsInfo = friends.map(friend => {
                return { _id, firstName, lastName, profilePic, location }
            }
        )

        //send relevant friend info to front-end
        res.status(200).json(relevantFriendsInfo)
    })
)

//Route for adding/removing a user from another user's friendList
Router.patch("/:id/:friendId",
    asyncHandler(async(req,res) => {
        //getting parameters from query url
        const { id, friendId } = req.params

        //finding our user and friend by using respective ids from params
        const user = User.findById(id)
        const friend = User.findById(friendId)

        //checking to see if user and friend are already friends
        //if already friends, both are removed from each other's friendsList
        //if not friends, both are added to each other's friendsList
        if(user.friendsList.includes(friend)){
            //since friendsList is an array containing the userIds of a user's friends, we can just filter the required id's out and set friendsList to the filtered array.
            user.friendsList = user.friendsList.filter((id) => id !== friendId)
            friend.friendsList = friend.friendsList.filter((id) => id !== id)
        } else {
            //similarly to the removing a friend, for adding a friend, the respective id's are pushed to the user's and the friend's friendList arrays.
            user.friendsList.push(friendId)
            friend.friendsList.push(id)
        }

        //save changes in our database
        await user.save()
        await friend.save()

        //once a friend has been added/removed, a new friendsList array is generated with all the user's current friends. This will contain relevant info for each friend that will be displayed on the user's homepage when he logs in
        const userFriends = await Promise.all(
            user.friendsList.map(id => User.findById(id))
        )

        //editing userFriends to extract relevant info to send to the front-end
        const relevantFriendInfo = userFriends.map(
            ({ _id, firstName, lastName, location, profilePic }) => {
                return { _id, firstName, lastName, location, profilePic };
            }
        )

        //sending new friendsList with editted info to the client front-end
        res.status(200).json(relevantFriendInfo)
    })
)

module.exports = Router