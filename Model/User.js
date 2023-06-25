const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Username should be longer than 5 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        enul: ['Admin', 'User'],
        default: 'User'
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)