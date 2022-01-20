const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      res.render('admin/products', {
        products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch(err => console.log(err));
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
  const userId = req.user;

  const product = new Product({
    title,
    price,
    imgUrl,
    description,
    userId,
  });

  product
    .save()
    .then(result => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit === 'true';

  if (!editMode) {
    return res.redirect('/');
  }

  const productId = req.params.productId;

  Product.findById(productId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }

      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/products',
        editing: editMode,
        product,
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const imgUrl = req.body.imgUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.findById(id)
    .then(product => {
      if(!product) {
        throw new Error('Product not found');
      }

      if(product.userId.toString() !== req.user._id.toString()) {
        throw new Error('Invalid action');
      }

      product.title = title;
      product.imgUrl = imgUrl;
      product.price = price;
      product.description = description;
      return product.save();
    })
    .then(result => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
      req.flash('error', err.message);
      res.redirect('/admin/products');
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.id;
  Product.deleteOne({
    _id: productId,
    userId: req.user._id,
  })
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/admin/products');
    });
};
