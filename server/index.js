const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const session = require('express-session')
const passport = require('passport')
const multer = require('multer')
/* all imported files/routes */
const passportConfig = require('./passportConfig')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const postController = require('./controllers/posts')

//setup dotenv
dotenv.config()

//mongoose setup
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to database!"))
.catch(err => console.log(`${err} could not reach the database!`))

//configuring express server
const app = express()

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true }
))
app.use(express.json())

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

/* ----------- Routes involving image upload with multer ---------- */
/* placing these routes here together to avoid rewriting multer config */

//FILE STORAGE / MULTER setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    //randomizing file name generation and adding .jpg extension
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//ROUTES INVOLVING FILES
app.post("/posts/new", upload.single('picture'), postController.createNewPost)

/* setting up routes */
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/posts', postsRouter)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})