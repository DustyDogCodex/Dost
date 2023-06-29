const mongoose = require('mongoose')
const { Schema } = mongoose

const PostSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    location: String,
    description: String,
    imagePath: String,
    userProfilePic: String,
    likes: {
        type: Map,
        of: Boolean
    },
    comments: {
        type: Array,
        default: []
    }
}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
