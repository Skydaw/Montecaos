const mongoose = require('mongoose')
 

const blogSchema = new mongoose.Schema({
    titleurl:{
        type:String,
        unique:true
    },
    title:{
        type: String,
        unique:true
    },
    body:{
     type: String,
    },

    img: {
    type: String
    },


},{
    timestamps:true
})
module.exports = mongoose.model('Blog',blogSchema)