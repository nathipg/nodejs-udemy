const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this.id = id;
  }

  save() {
    const db = getDb();

    return db
      .collection('users')
      .insertOne(this)
      .then(result => {})
      .catch(err => console.log(err));
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(
      cp => cp.productId.toString() == product._id.toString()
    );
    let newQty = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex > -1) {
      newQty = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQty;
    } else {
      updatedCartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQty,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };

    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new mongodb.ObjectId(this.id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(i => i.productId);
    return db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then(products => {
        console.log(products);
        return products.map(p => {
          return {
            ...p,
            quantity: this.cart.items.find(
              i => i.productId.toString() === p._id.toString()
            ).quantity,
          };
        });
      });
  }

  static findById(id) {
    const db = getDb();
    return db.collection('users').findOne({
      _id: new mongodb.ObjectId(id),
    });
  }
}

module.exports = User;
