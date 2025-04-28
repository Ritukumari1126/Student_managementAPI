const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    courseName:{type:String,require:true},
    description:{type:String,require:true},
    price:{type:String,require:true},
    startingDate:{type:String,require:true},
    endDate:{type:String,require:true},
    imageUrl : {type:String,require:true},
    imageId : {type:String,require:true},
    uId: {type:String,require:true}
})

module.exports = mongoose.model('course',courseSchema)