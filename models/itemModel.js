const mongoose = require('mongoose');

const itemSchema = mongoose.Schema ({
    seller : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required: true,
        unique:true
    },
    description : {
        type : String,
        required : true,
    },
    price:{
        type : Number,
        required : true,
        default : 0,
    },
    category:{
        type: String,
        default : "others"
    }
},{timestamps:true});

const Item = mongoose.model('Item',itemSchema);
module.exports = Item;