const getDb = require("../util/database").getDb;

class Order {
  constructor(number, price, product) {
    this.number = number;
    this.price = price;
    this.product = product;
  }
  save() {
    const db = getDb();
    db.collection("Orders")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

exports.module = Order;
