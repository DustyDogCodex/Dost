const express = require('express')
const passport = require('passport')
const Router = express.Router()

//importing UserSchema
const User = require('../models/Users')

//Login existing users. Using bcrypt compare now instead of passport local
//app is small enough to justify not using passport
Router.post(
    '/login', 
    passport.authenticate('local', { session: true }),
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