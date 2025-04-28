const express = require('express')
const Router = express.Router()
const Course = require('../model/Course')
const mongoose = require('mongoose')
const checkAuth = require('../middleware/checkAuth')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECREAT
});

Router.post('/add-course',checkAuth,async(req,res)=>{
   try{
    const loggedInUser = await jwt.verify(req.headers.authorization.split(" ")[1],'sbs online classes 123')
    const uploadImage =  await cloudinary.uploader.upload(req.files.photo.tempFilePath)
    const newCourse = new Course({
        _id:new mongoose.Types.ObjectId,
        courseName:req.body.courseName,
        description:req.body.description,
        price:req.body.price,
        startingDate:req.body.startingDate,
        endDate:req.body.endDate,
        imageUrl:uploadImage.secure_url,
        imageId:uploadImage.public_id,
        uId:loggedInUser._id,

    })

    const course =  await newCourse.save()
    res.status(200).json({
        newCourse:course
    })
   }
   catch(err){
        console.log(err)
   }
})

Router.get('/all-course',checkAuth,async(req,res)=>{
    try{
        const loggedInUser = await jwt.verify(req.headers.authorization.split(" ")[1],"sbs online classes 123")
        const courseList = await Course.find({uId:loggedInUser._id})
        res.status(200).json({
            courseList:courseList
        }) 
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
})

Router.delete('/delete-course/:courseId',checkAuth,async(req,res)=>{
    try
    {
        const loggedInUser = await jwt.verify(req.headers.authorization.split(" ")[1],'sbs online classes 123')
        const course = await Course.findById(req.params.courseId)
        if(course.uId == loggedInUser._id){
            await cloudinary.uploader.destroy(course.imageId)
            const deleteResponse = await Course.findByIdAndDelete(req.params.courseId)
            res.status(200).json({
                msg:deleteResponse
            })
        }
        else{
            res.status(500).json({
                error:'you dont have permission to delete it'
            })
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
})


Router.put('/update/:courseId',checkAuth,async(req,res)=>{
    try{
        const loggedInUser = await jwt.verify(req.headers.authorization.split(" ")[1],'sbs online classes')
        const course = await Course.findById(req.params.courseId)
        if(loggedInUser._id == course.uId)
        {
            if(req.files)
            {
                await cloudinary.uploader.destroy(course.imageId)
                const updatedphoto = await cloudinary.uploader.upload(req.files.photo.tempFilePath)
                const updateCourse = {
                    courseName:req.body.courseName,
                    description:req.body.description,
                    startingDate:req.body.startingDate,
                    endDate:req.body.endDate,
                    price:req.body.price,
                    photo:updatedphoto.secure_url,
                }

                const newupdateCourse = await Course.findByIdAndUpdate(req.params.courseId,updateCourse,{new:true})
            }
            else{
                const updateCourse = {
                    courseName:req.body.courseName,
                    description:req.body.description,
                    startingDate:req.body.startingDate,
                    endDate:req.body.endDate,
                    price:req.body.price,
                }

                const newupdateCourse = await Course.findByIdAndUpdate(req.params.courseId,updateCourse,{new:true})
                                                                            
            }
        }
    }
    catch(err){

    }
})

module.exports = Router