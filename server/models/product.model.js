const mongoose = require('mongoose')
 

const productSchema = new mongoose.Schema({
    producturl:{
        type:String,
        unique:true
    },
    name:{
        type: String,
        unique:true
    },
    description:{
     type: String,
    },
    price:{
    type: Number,
    },
    feature: {
    type: String
    },
    img:{
        type:String
    },
    order:{
        type: Number,
        },


})
module.exports = mongoose.model('Product',productSchema)