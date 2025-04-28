const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    fullName:{type:String,require:true},
    email:{type:String,require:true},
    phone:{type:String,require:true},
    address:{type:String,require:true},
    password:{type:String,require:true},
    imageUrl:{type:String,require:true},
    imageId:{type:String,require:true}
},{timestamps:true})

module.exports = mongoose.model('users',userSchema);