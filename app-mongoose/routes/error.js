const express = require('express');

const errorController = require('../controllers/error');

const router = express.Router();

router.use('/500', errorController.get500);

router.use(errorController.get404);

module.exports = router;
