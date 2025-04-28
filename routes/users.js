const express = require('express')
const Router = express.Router()
const User = require('../model/User')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2
require('dotenv').config();

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECREAT
});

Router.post('/SignUp',async(req,res)=>{
    try{
        console.log(process.env.TOKEN_KEY)
        console.log(req.files.photo)
        const users = await User.find({email:req.body.email})
        if(users.length>0)
        {
            return res.status(500).json({
                error:'email is already registered...'
            })
        }
        const uploadImage = await cloudinary.uploader.upload(req.files.photo.tempFilePath)
        console.log(uploadImage)
        const hash = await bcrypt.hash(req.body.password,10);
        const newUser = new User({
            _id:new mongoose.Types.ObjectId,
            fullName:req.body.fullName,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            imageUrl:uploadImage.secure_url,
            imageId:uploadImage.public_id,
            password:hash,            
        })

       const user = await newUser.save()
       res.status(200).json({
        newUser:user
       }) 
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            error:err
        })
    }
})

//login api

Router.post('/Login',async(req,res)=>{
    try{
        const users = await User.find({email:req.body.email})
        if(users.length == 0){
            return res.status(500).json({
                error: 'email is not registered'
            })
        }

        const isValid = await bcrypt.compare(req.body.password,users[0].password)

        if(isValid){
            const token = jwt.sign({
                _id:users[0]._id,
                fullName:users[0].fullName,
                email:users[0].email,
                imageId:users[0].imageId
            },
            'sbs online classes 123',
            {
                expiresIn:'365d'
            })

            res.status(200).json({
                _id:users[0]._id,
                fullName:users[0].fullName,
                email:users[0].email,
                imageUrl:users[0].imageUrl,
                imageId:users[0].imageId,
                address:users[0].address,
                token:token
            })
        }


        
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            error:err
        })
    }
})

module.exports = Router;