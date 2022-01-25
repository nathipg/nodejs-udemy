const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

router.get('/products', isAuth, adminController.getProducts);

router.get('/add-product', isAuth, adminController.getAddProduct);

router.post(
  '/add-product',
  isAuth,
  [
    body('title').trim().isString().isLength({ min: 3 }),
    body('price').isFloat(),
    body('description').trim().isLength({ min: 5, max: 400 }),
  ],
  adminController.postAddProduct
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
  '/edit-product',
  isAuth,
  [
    body('title').trim().isString().isLength({ min: 3 }),
    body('price').isFloat(),
    body('description').trim().isLength({ min: 5, max: 400 }),
  ],
  adminController.postEditProduct
);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
