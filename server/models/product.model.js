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
    type: String,
    },
    feature: {
    type: String
    },
    img:{
        type:String
    }

})
module.exports = mongoose.model('Product',productSchema)