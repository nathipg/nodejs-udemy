const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get('Cookie').split(';')[0].trim().split('=')[1] === 'true';

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: req.flash('error'),
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly'); // Expire, Max-Age, Secure, HttpOnly, etc
  const email = req.body.email;
  const password = req.body.password;
  let user;

  User.findOne({ email: email })
    .then(dbUser => {
      if(!dbUser) {
        throw Error('User not found');
      }

      user = dbUser;

      return bcrypt.compare(password, user.password);
    }).then(result => {
      if(!result) {
        throw Error('Wrong password');
      }

      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        res.redirect('/');
      });
    })
    .catch(err => {
      console.log(err);
      req.flash('error', err.message);
      res.redirect('/login');
    });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        throw Error('User already exists');
      }
      
      if(password !== confirmPassword) {
        throw Error('Confirm password and password are different');
      }

      return bcrypt.hash(password, 12);
    })
    .then(hashedPassword => {
      const user = new User({
        email,
        password: hashedPassword,
        cart: { items: [] },
      });

      return user.save();
    })
    .then(result => {
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/signup');
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
