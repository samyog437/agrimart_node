const User = require('../Model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = (req, res, next) => {
    User.findOne({username: req.body.username})
        .then(user => {
            if(user != null) {
                let err = new Error (`User ${req.body.username} already exists`)
                res.status(400)
                return next(err)
            }
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) return next(err)
                user = new User()
                user.username = req.body.username
                user.email = req.body.email
                user.fullname = req.body.fullname
                user.password = hash
                if(req.body.role) user.role = req.body.role
                if(req.file) user.image = req.file.path;4
                user.save().then(user => {
                    res.status(201).json({
                        'status': 'User has registered successfully',
                        userId: user._id,
                        username: user.username,
                        email: user.email,
                        fullname: user.fullname,
                        role: user.role,
                        image: user.image,
                    })
                }).catch(next)
            })
        }).catch(next)
}

const loginUser = (req, res, next) => {
    User.findOne({username: req.body.username})
        .then(user => {
            if(user == null) {
                let err = new Error(`User ${req.body.username} has not been registered`)
                res.status(404)
                return next(err)
            }
            bcrypt.compare(req.body.password, user.password, (err, status) => {
                if(err) return next(err)
                if(!status) {
                    let err = new Error('Password does not match')
                    res.status(401)
                    return next(err)
                }
                let data = {
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                    fullname: user.fullname,
                    role: user.role,
                }
                jwt.sign(data, process.env.SECRET,
                    {'expiresIn': '30d'}, (err, token) => {
                        if(err) return next(err)
                        res.json({
                            userId: user._id,
                            'status': 'User was logged in successfully',
                            token: token
                        })
                        console.log('User has logged in successfully')
                    })
            })
        }).catch(next)
}

const getUserData = async(req, res, next) => {
    const userId = req.params.user_id;
    console.log(userId)

      try {
        const userData = await User.findById({ _id: userId });
        console.log(userData)
        if (!userData) {
          const error = new Error(`No user found with ID ${userId}`);
          error.status = 404;
          throw error;
        }
        res.status(200).json(userData);
      } catch (err) {
        res.status(500).json({ success: false });
      }
  };


module.exports = {
    registerUser,
    loginUser,
    getUserData,
}