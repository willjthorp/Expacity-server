const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');

const response = require('../helpers/response');
const User = require('../models/user').User;

const upload = require('../config/multer');


// Login User
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return response.notFound(req, res);
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return response.data(req, res, req.user);
    });
  })(req, res, next);
});

// Signup User
router.post('/signup', (req, res, next) => {
  const {
    username,
    email,
    password
  } = req.body;

  if (!username) {
    return response.unprocessable(req, res, 'Missing mandatory field "Username".');
  }
  if (!password) {
    return response.unprocessable(req, res, 'Missing mandatory field "Password".');
  }
  if (!email) {
    return response.unprocessable(req, res, 'Missing mandatory field "Email".');
  }

  User.findOne({
    username
  }, 'username', (err, userExists) => {
    if (err) {
      return next(err);
    }
    if (userExists) {
      return response.unprocessable(req, res, 'Username already in use.');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      username,
      email,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        return next(err);
      }
      req.login(newUser, (err) => {
        if (err) {
          return next(err);
        }
        return response.data(req, res, newUser.asData());
      });
    });
  });
});


//UPLOAD FILE
router.post('/upload', upload.single('file'), (req, res, next) => {
  const data = {
    userFileName: `/uploads/${req.file.filename}`
  };

  return response.data(req, res, data);
});


//Update USER profile
router.put('/me', (req, res, next) => {

  const userUpdate = {
    pic_path: req.body.pic_path || req.user.pic_path,
  };

  User.findByIdAndUpdate(req.user._id, userUpdate, {
    new: true
  }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return response.notFound(req, res);
    }
    let data = user.asData();
    return response.data(req, res, data);
  });
});


// Logout user
router.post('/logout', (req, res) => {
  req.logout();
  return response.ok(req, res);
});


router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    let user = req.user;
    return response.data(req, res, user.asData());
  }

  return response.notFound(req, res);
});

module.exports = router;
