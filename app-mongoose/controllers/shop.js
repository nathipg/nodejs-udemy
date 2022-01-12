const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        products,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch(err => {
      console.log(err);
      res.render('shop/product-list', {
        products: [],
        pageTitle: 'All Products',
        path: '/products',
      });
    });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;

  // Product.findAll({
  //   where: {
  //     id: productId,
  //   },
  // })
  //   .then(product => {
  //     res.render('shop/product-detail', {
  //       product: product[0],
  //       pageTitle: `Product Details - ${product[0].title}`,
  //       path: '/products',
  //     });
  //   })
  //   .catch(err => console.log(err));

  Product.findById(productId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: `Product Details - ${product.title}`,
        path: '/products',
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        products,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch(err => {
      console.log(err);
      res.render('shop/index', {
        products: [],
        pageTitle: 'Shop',
        path: '/',
      });
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
      console.log(products)
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Cart',
        products,
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .deleteItemFromCart(productId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Orders',
        orders,
      });
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
