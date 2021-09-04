const fs = require('fs');
const path = require('path');

const Cart = require('./cart');
const rootDir = require('../util/path');

const filePath = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (callback) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      return callback([]);
    }

    callback(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, imgUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imgUrl = imgUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile(products => {
      let updatedProducts;
      if(this.id) {
        const existingProductIndex = products.findIndex(product => product.id === this.id);
        updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
      } else {
        this.id = Math.random().toString();
        products.push(this);
        updatedProducts = [...products];
      }
      
      fs.writeFile(filePath, JSON.stringify(updatedProducts), err => {
        console.log(err);
      });
    });
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(product => product.id === id);
      const updatedProducts = products.filter(product => product.id != id);

      fs.writeFile(filePath, JSON.stringify(updatedProducts), err => {
        if(!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findById(id, callback) {
    getProductsFromFile(products => {
      const product = products.find(product => product.id === id);
      callback(product);
    });
  }
};
