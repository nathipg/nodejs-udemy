const express = require('express');

const router = express.Router();

const users = [];

router.get('/', (req, res) => {
  res.render('add-user', {
    pageTitle: 'Add User',
  });
});

router.get('/users', (req, res) => {
  res.render('user-list', {
    pageTitle: 'User List',
    users,
  });
});

router.post('/add-user', (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  users.push({
    name,
  });
  res.redirect('/users');
});

module.exports = router;