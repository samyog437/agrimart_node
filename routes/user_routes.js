const express = require('express')
const upload = require('../middleware/upload');
const user_controller = require('../controllers/user_controller')
const delivery_controller = require('../controllers/delivery_controller')
const khalti = require('./khalti')
const { verifyUser } = require('../middleware/auth')

const router = express.Router()

router.route('/')
    .post(upload.single('image'), user_controller.registerUser)

router.route('/login')
    .post(user_controller.loginUser)

router.route('/:user_id')
    .get(user_controller.getUserData)
    .put(upload.single('image'), verifyUser, user_controller.updateUser)

router.route('/:user_id/update-password')
    .put(verifyUser, user_controller.updatePassword)

router.route('/khalti')
    .post(khalti.khalti)


module.exports = router