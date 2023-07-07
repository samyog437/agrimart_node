const mongoose = require("mongoose");

const deliverySchema = mongoose.Schema({
    city: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        required: true,
    },
    contactNo: {
        type: Number,
        required: true,
    },
    deliver_userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
}, {timestamps: true});

module.exports = mongoose.model('Delivery', deliverySchema);
