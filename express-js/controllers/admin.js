const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imgUrl = req.body.imgUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(null, title, imgUrl, price, description);
  product.save();
  
  res.redirect('/admin/products');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit === 'true';

  if(!editMode) {
    return res.redirect('/');
  }

  const productId = req.params.productId;

  Product.findById(productId, product => {
    if(!product) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/products',
      editing: editMode,
      product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const imgUrl = req.body.imgUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(id, title, imgUrl, price, description);
  product.save();

  res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.id;
  Product.deleteById(productId);
  res.redirect('/admin/products');
};