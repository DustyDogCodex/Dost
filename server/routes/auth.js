const express = require('express')
const asyncHandler = require('express-async-handler')
const passport = require('passport')
const bcrypt = require('bcrypt')
const multer = require('multer')
const Router = express.Router()

//importing UserSchema
const User = require('../models/Users')

//multer setup for storing uploaded profile pictures
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //storing all uploaded images in uploadedimages folder in our root directory 
    cb(null, 'public/assets')
  },
  filename: function (req, file, cb) {
    //selecting a randomized name for the file
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9)+ '.jpg')
  }
})

const upload = multer({ storage: storage })

//Register new users
Router.post(
    '/register', 
    upload.single('picture'),
    asyncHandler( async(req,res,next) => {
        
        //for testing and dev
        /* res.json({ name: req.body.name, email: req.body.email, password: req.body.password}) */

        //extracting user info from data object
        const { firstName, lastName, email, password, profilePic, friendsList, location, status } = req.body.data

        //if email already exists, the route will respond with a 'failed' message which will trigger an alert on our frontend. 
        const invalidEmail = await User.findOne({ email })
        if(invalidEmail){
            res.send('failed')
        } else {
            //email is unique, we can proceed with saving user information
            //generating salt
            const salt = await bcrypt.genSalt(10)
            //hashing password
            const hashedPassword = await bcrypt.hash(password, salt)

            //passing req info + hashed pasword into User model
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                profilePic,
                friendsList,
                location,
                status,
                profileViews: Math.floor(Math.random() * 100)
            })

            //saving newUser to db
            const user = await newUser.save()

            //send success status
            res.status(201).json(user)  
        }
    })
)

//Login existing users. Using bcrypt compare now instead of passport local
//app is small enough to justify not using passport
Router.post(
    '/login', 
    passport.authenticate('local', { failureRedirect: "/" }),
    function(req, res) {
        res.send('ok')
    }
);

//simple get request to check if a user is authenticated and retrieve user information
Router.get(
    '/getuser',
    (req,res) => {
        res.send(req.user)
    }
)

//logout user 
Router.get(
    "/logout", 
    (req, res, next) => {
        req.logout(function(err) {
            if (err) return next(err)
            res.send('success')
        })
    }
)

module.exports = Router