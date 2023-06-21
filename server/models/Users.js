const mongoose = require('mongoose')
const { Schema } = mongoose

//simple schema for storing user related info. A name to identify them on their profiles, email + password to login
//profilePic to use on their profile (but not required) and some extra stuff to add content to the profile
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        min: 2,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profilePic: {
        type: String,
        default: ""
    },
    friendsList:{
        type: Array,
        default: []
    },
    location: String,
    status: String,
    profileViews: Number
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

module.exports = User