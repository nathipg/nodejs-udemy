const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');

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
        if (value === 'test@test.com') {
          throw new Error('Forbidden email');
        }
        return true;
      }),
    body(
      'password',
      'Invalid password: Should have at least 5 characters with only numbers and text'
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.post('/reset', authController.postReset);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
