const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    image: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, {timestamps:true})

module.exports = mongoose.model('Product', productSchema)