const express = require('express')
const app = express()
const UserRouter = require('./routes/users')
const CourseRouter = require('./routes/course')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')
const connectToDataBase = async(req,res)=>{
    try{
        const res =await mongoose.connect('mongodb+srv://Ritu1106:Ritu1106@cluster0.zmd7x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('connected to database')
    }
    catch(err){
        console.log(err)
    }
}


connectToDataBase();


app.use(bodyparser.json())
app.use(fileUpload({
    useTempFiles:true
}))
app.use('/users',UserRouter)
app.use('/course',CourseRouter)
module.exports = app;