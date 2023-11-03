const mongoose = require('mongoose');
const User = require('./userModel');
const Item = require('./itemModel');

const cartSchema = mongoose.Schema ({
    user : {
        type : objectID,
        ref : User,
        required : true
    },
    Items : [
        {
            type : objectID,
            ref : Item,
            required : true
        }
    ]
    
},{timestamps:true});

const Cart = mongoose.model('Cart',cartSchema);
module.exports = Cart;