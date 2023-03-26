const express = require('express');
const cors = require("cors")
require("dotenv").config();
const {connection} =  require("./db");
const { auth } = require('./middleware/note.middleware');
const { noteRoute } = require('./route/notes.route');
const { userRoute } = require('./route/user.route');
const app = express();

app.use(cors())
app.use(express.json())
app.use("/user",userRoute)

app.use(auth);
app.use("/note", noteRoute);

app.listen(process.env.PORT,async()=>{
    try {
        await connection 
        console.log("connected to db")
    } catch (error) {
       console.log(error) 
    }
    console.log("server is running")
})