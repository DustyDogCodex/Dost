const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const session = require('express-session')
const passport = require('passport')
const multer = require('multer')
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
        origin: ['https://dost-production.up.railway.app/'],
        credentials: true 
    }
))
app.use(express.json())

/* ----------------------- PASSPORT INITIALISATION ---------------------- */

//setting up express sessions and initializing passportjs
app.use(session({ 
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: true,
    cookie: { 
        sameSite: "lax",
        secure: "auto",  //for dev environment
        maxAge: 24 * 60 * 60 * 1000 //one day 
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

//creating local variables for passportJS
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

/* ------------------------------------------------------------------------ */

//dist folder with finished production build
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/*', (req,res) => {
    res.sendFile(
        path.join(__dirname, 'dist', 'index.html'),
        function(err){
            if(err){
                res.status(500).send(err)
            }
        }
    )
})

/* -------- SETTING UP A STATIC FOLDER FOR UPLOADED IMAGES --------- */

//storing a route to the root directory for the project
//this is used to specify a route to /uploadedImages folder 
const dirnameSplit = __dirname.split('\\')
dirnameSplit.splice(-1,1)
const rootDirectory = dirnameSplit.join('/')

//setting up uploads folder as a static asset
//now if we access //localhost:5000/uploads/image-file-name.jpg we can view uploaded images
app.use('/uploads', express.static(rootDirectory + '/uploadedImages'))

/* ----------------------------------------------------------------- */

/* ----------- Routes involving image upload with multer ------------------ */

//FILE STORAGE / MULTER setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploadedImages/");
    },
    filename: function (req, file, cb) {
        //randomizing file name to avoid filename conflicts
        cb(null, Date.now() + "-" + Math.round((Math.random() * 1E9)) + ".jpg");
    },
});
const upload = multer({ storage });

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

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})