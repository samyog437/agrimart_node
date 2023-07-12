const express = require('express')
const {verify} = require('jsonwebtoken')
const product_controller = require('../controllers/product_controller')
const review_controller = require('../controllers/review_controller')
const upload = require('../middleware/upload')
const { verifyUser } = require('../middleware/auth')
const router = express.Router()

router.route('/')
    .get(product_controller.getAllProducts)
    .post(upload.single('image'),product_controller.createProduct)

router.route('/:id')
    .get(product_controller.getAProduct)

router.route('/:id/reviews')
    .get(review_controller.getAllReviews)
    .post(verifyUser,review_controller.createReview)


module.exports = router