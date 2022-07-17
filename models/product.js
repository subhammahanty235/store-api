const mongoose = require('mongoose')

const productSchema  = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Product name must be provided"]
    },
    price:{
        type:Number,
        required:[true , "Price must be provided"]
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:0.0,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['ikea','liddy','caressa','marcos'],
            message:'{VALUE} is not suppoted'
        },
    },

})

module.exports = mongoose.model('Product',productSchema)