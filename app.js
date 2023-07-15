require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const user_router = require('./routes/user_routes')
const product_router = require('./routes/product_routes')
const delivery_router = require('./routes/delivery_routes')
const khalti = require('./controllers/khalti_controller')

const app = express()
app.use(cors())

const DB_URI = process.env.DB_URI;

console.log(DB_URI)

mongoose.connect(DB_URI)
    .then(() => {   
        console.log('connected')
    }).catch((err) => console.log(err))

app.use(express.json())

app.use('/user', user_router)
app.use('/products', product_router)
app.use('/delivery', delivery_router)
app.use('/image', express.static('uploads'))

app.use((err, req, res, next) => {
    console.log(err.stack)
    if (res.statusCode == 200) res.status(500)
    res.json({"msg": err.message})
})

module.exports = app