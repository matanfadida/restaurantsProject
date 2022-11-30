const getDb = require("../util/database").getDb;

class Order {
  constructor(numberTable, price, products) {
    this.numberTable = numberTable;
    this.price = price;
    this.products = products;
  }
  save() {
    const db = getDb();
    return db
      .collection("Orders")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static fetchAllOrders() {
    const db = getDb();
    return db
      .collection("Orders")
      .find()
      .toArray()
      .then((orders) => {
        return orders;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Order;
