const mongoose = require('mongoose')
 

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    body:{
     type: String,
    },
    date:{
        type: String,
    },
    img: {
        type: String
    }

})
module.exports = mongoose.model('Blog',blogSchema)