const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.get('/reset', authController.getReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/login', authController.postLogin);

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Invalid email')
      .custom((value, { req }) => {
        // if (value === 'test@test.com') {
        //   throw new Error('Forbidden email');
        // }
        // return true;

        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('User already exists');
          }
        });
      }),
    body(
      'password',
      'Invalid password: Should have at least 5 characters with only numbers and text'
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords have to match');
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.post('/reset', authController.postReset);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
