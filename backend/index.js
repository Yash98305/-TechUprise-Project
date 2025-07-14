const dotenv = require("dotenv");
dotenv.config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


const auth = require("./Routes/auth.js")
const note = require("./Routes/note.js")
const bookmark = require("./Routes/bookmark.js")
app.get("/",(req,res)=>{
    res.status(200).send({
        message : "Welcome to the Web Application"
    })
    
})
app.use("/api/v1/auth",auth)
app.use("/api/v1/notes",note)
app.use("/api/v1/bookmarks",bookmark)

module.exports =app