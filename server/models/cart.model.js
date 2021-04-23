const mongoose = require('mongoose')
const Schema =mongoose.Schema
let ItemSchema = new Schema({
    productId: {
        type:String,
        require:true
    },
    productName:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:[1, "la quantité ne peut pas etre moins que 1"]
    },
    price:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    }
    },{
        timestamps:true
    })
    const CartSchema = new Schema({
        userid:{
            type:String,
            required:true
        },

        items: [ItemSchema],

        subTotal: {
            type: Number
        }
    }, {
        timestamps: true
    })
module.exports = mongoose.model('cart', CartSchema);