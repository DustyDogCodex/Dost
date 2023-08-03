const express = require('express')
const asyncHandler = require('express-async-handler')
const Router = express.Router()

//importing user model
const User = require('../models/Users')

module.exports = Router