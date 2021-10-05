const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
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

  req.user
    .createProduct({
      title,
      imgUrl,
      price,
      description,
    })
    .then(result => {
      console.log('Product created');
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      res.redirect('/admin/products');
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit === 'true';

  if (!editMode) {
    return res.redirect('/');
  }

  const productId = req.params.productId;

  //Product.findByPk(productId)
  req.user
    .getProducts({ where: { id: productId } })
    .then(products => {
      if (!products) {
        return res.redirect('/');
      }

      const product = products[0];

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

  Product.findByPk(id)
    .then(product => {
      product.title = title;
      product.imgUrl = imgUrl;
      product.price = price;
      product.description = description;
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT', result);
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/admin/products');
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.id;
  Product.findByPk(productId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log('PRODUCT DELETED', result);
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/admin/products');
    });
};
