const express = require('express')
const delivery_controller = require('../controllers/delivery_controller')
const { verifyUser } = require('../middleware/auth')

const router = express.Router()

router.route('/')
    .post(verifyUser, delivery_controller.orderDelivery)

// router.route('/:user_id')
//     .get(verifyUser, delivery_controller.getOrderData)

module.exports = router 