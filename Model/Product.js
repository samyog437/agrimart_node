const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    reviewer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviewerName: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
        min:1,
        max:5
    }
})

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
    },
    reviews: [reviewSchema]
}, {timestamps:true})

module.exports = mongoose.model('Product', productSchema)