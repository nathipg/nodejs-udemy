const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');

const filePath = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      let cart = {
        products: [],
        totalPrice: 0,
      };

      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProductIndex = cart.products.findIndex(
        product => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty++;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = +cart.totalPrice + +productPrice;
      fs.writeFile(filePath, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        return;
      }

      const cart = JSON.parse(fileContent);
      const updatedCart = { ...cart };
      const product = updatedCart.products.find(product => product.id === id);

      if(!product) {
        return;
      }

      updatedCart.products = updatedCart.products.filter(
        product => product.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * product.qty;

      fs.writeFile(filePath, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    });
  }

  static getCart(callback) {
    fs.readFile(filePath, (err, fileContent) => {
      if(err) {
        return callback(null);
      }

      const cart = JSON.parse(fileContent);

      callback(cart);
    });
  }
};
