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

app.post('/khalti/payment/verify', async (req, res) => {
    const { token, amount } = req.body;
  
    try {
      const paymentSuccessful = await khalti.verifyPayment(token, amount);
  
      if (paymentSuccessful) {
        // Payment was successful
        // Update your database or perform necessary actions
        res.status(200).send('Payment successful');
      } else {
        // Payment failed or was not completed
        // Handle the failure scenario
        res.status(400).send('Payment failed');
      }
    } catch (error) {
      // Handle any errors that occurred during the verification process
      res.status(500).send('Error verifying payment');
    }
  });


app.use((err, req, res, next) => {
    console.log(err.stack)
    if (res.statusCode == 200) res.status(500)
    res.json({"msg": err.message})
})

module.exports = app