const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
/* all imported files/routes */
const passportConfig = require('./passportConfig')
const authRouter = require('./routes/auth')

//setup dotenv
dotenv.config()

//mongoose setup
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to database!"))
.catch(err => console.log(`${err} could not reach the database!`))

//configuring express server
const app = express()
app.use(express.json())
app.use(cors())

/* setting up routes */
app.use('/auth', authRouter)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})