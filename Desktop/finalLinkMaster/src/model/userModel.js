const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    isDeleted : {
        type:Boolean,
        default:false
    }
},{timestamps:true});
module.exports = mongoose.model("User", userSchema);