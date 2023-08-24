const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const session = require('express-session')
const passport = require('passport')
const multer = require('multer')
const MongoStore = require('connect-mongo')
const path = require('path')
/* all imported files/routes */
const passportConfig = require('./passportConfig')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const settingsRouter = require('./routes/settings')
const { createNewPost, updatePost } = require('./controllers/posts')
const { createAccount } = require('./controllers/auth')
const updateProfilePic = require('./controllers/settings')

//setup dotenv
dotenv.config()

//mongoose setup
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to database!"))
.catch(err => console.log(`${err} could not reach the database!`))

//configuring express server
const app = express()

app.use(cors(
    {
        origin: ['https://dost-client-production.up.railway.app'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
        credentials: true 
    }
))
app.use(express.json())

/* ----------------------- PASSPORT INITIALISATION ---------------------- */

//setting up express-session 
app.use(session({ 
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false,
    cookie: { 
        sameSite: "lax",
        secure: false,  
        maxAge: 24 * 60 * 60 * 1000 //one day 
    },
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGO_URL,
        dbName: 'test',
        touchAfter: 24 * 3600 // lazy update unless somethings was changed in session data, time period in seconds
    })
}))

//initializing passportjs
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: false }))

//creating local variables for passportJS
app.use(function(req, res, next) {
    res.locals.currentUser = req.user
    next()
})

/* ------------------------------------------------------------------------ */

// Serve static files from the vite build that is now stored in the public folder
app.use(express.static(path.join(__dirname, 'public')))

/* -------- SETTING UP A STATIC FOLDER FOR UPLOADED IMAGES --------- */

//setting up uploads folder as a static asset
//now if we access //localhost:5000/uploads/image-file-name.jpg we can view uploaded images
app.use('/uploads', express.static('uploadedImages'))

/* ----------------------------------------------------------------- */

/* ----------- Routes involving image upload with multer ------------------ */

//FILE STORAGE / MULTER setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploadedImages/");
    },
    filename: function (req, file, cb) {
        //randomizing file name to avoid filename conflicts
        cb(null, Date.now() + "-" + Math.round((Math.random() * 1E9)) + ".jpg")
    }
})
const upload = multer({ storage })

//ROUTES INVOLVING UPLOADING FILES
app.post("/auth/register", upload.single('image'), createAccount)
app.post("/posts/new", upload.single('image'), createNewPost)
app.patch("/posts/update/:postId", upload.single('image'), updatePost)
app.put("/settings/profilepic", upload.single('image'), updateProfilePic)

/* ------------------------------------------------------------------------ */

/* routes */
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/posts', postsRouter)
app.use('/settings', settingsRouter)

// Route for handling all other requests and serving the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})