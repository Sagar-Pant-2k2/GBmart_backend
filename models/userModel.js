const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    "email" : {
        type:String,
        required : true,
        unique : true
    },
    "userName" : {
        type:String,
        required:true,
    },
    "password" : {
        type : String,
        required : true,
    },
    
    "isAdmin" : {
        type : Boolean,
        default : false
    },
    
},{timestamps : true});

const User =  mongoose.model('User',userSchema);

module.exports = User;