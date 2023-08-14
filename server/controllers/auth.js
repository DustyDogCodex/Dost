const User = require("../models/Users")
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

/* ------- Create new user account -------- */

const createAccount = asyncHandler(
    async(req,res) => {
        //extracting user info from data object
        const { firstName, lastName, email, password, location } = req.body
       
        //if email already exists, the route will respond with a 'failed' message which will trigger an alert on our frontend. 
        const invalidEmail = await User.findOne({ email })

        /* if email already exist in our database, a failed message is sent to toggle an alert on the frontend */
        if(invalidEmail){
            res.status(418).send('failed')
        } else {
            //email is unique, we can proceed with saving user information
            //generating salt
            const salt = await bcrypt.genSalt(10)
            //hashing password
            const hashedPassword = await bcrypt.hash(password, salt)

            //checking for uploaded file. 
            const profileImage = req.file ? req.file.filename : ''

            //passing req info + hashed pasword into User model
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                profilePic: profileImage,
                friendsList: [],
                location,
                status: '',
                profileViews: Math.floor(Math.random() * 100)
            }) 
            
            //saving newUser to db
            await newUser.save()

            //send success status
            res.status(201).send('success') 
        }
    }
)

module.exports = { createAccount }