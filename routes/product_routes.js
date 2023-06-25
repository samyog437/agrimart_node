const express = require('express')
const {verify} = require('jsonwebtoken')
const product_controller = require('../controllers/product_controller')
const router = express.Router()

router.route('/')
    .get(product_controller.getAllProducts)
    .post(product_controller.createProduct)

router.route('/:id')
    .get(product_controller.getAProduct)

module.exports = router