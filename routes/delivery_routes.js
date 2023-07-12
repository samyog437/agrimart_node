const express = require('express')
const delivery_controller = require('../controllers/delivery_controller')
const { verifyUser } = require('../middleware/auth')

const router = express.Router()

router.route('/')
    .post(verifyUser, delivery_controller.orderDelivery)
    .get(verifyUser, delivery_controller.getDeliveryData)

module.exports = router 