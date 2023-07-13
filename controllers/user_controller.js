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
                if (req.file) {
                    // Modify the image path to remove the "uploads" directory
                    user.image = req.file.path.replace("uploads\\", "");
                  }
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
                            role: user.role,
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

  const updateUser = async (req, res) => {
    const { user_id } = req.params;
    const { username, fullname, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ _id: user_id });
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (username && existingUser.username !== username) {
        const userWithSameUsername = await User.findOne({ username });
        if (userWithSameUsername && userWithSameUsername._id.toString() !== user_id) {
          return res.status(400).json({ message: 'Username already exists' });
        }
      }
  
      let updateFields = { username, fullname };
      if (password) {
        updateFields.password = await bcrypt.hash(password, 10);
      }
  
      // Check if image file is present in the request form-data
      if (req.file) {
        // Assuming you are using a file upload library that saves the image file and returns a file path or URL
        const imagePath = req.file.path.replace("uploads\\", ""); // Replace with the actual path or URL of the uploaded image
        updateFields.image = imagePath;
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        user_id,
        updateFields,
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ data: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  
  


module.exports = {
    registerUser,
    loginUser,
    getUserData,
    updateUser,
}