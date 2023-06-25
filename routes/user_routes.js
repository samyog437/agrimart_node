const express = require('express')
const upload = require('../middleware/upload');
const user_controller = require('../controllers/user_controller')

const router = express.Router()

router.route('/')
    .post(upload.single('image'), user_controller.registerUser)

router.route('/login')
    .post(user_controller.loginUser)

router.route('/:user_id')
    .get(user_controller.getUserData)

module.exports = router