const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(numberTable, totalPrice, products) {
    this.numberTable = numberTable;
    this.totalPrice = totalPrice;
    this.products = products;
  }
  save() {
    const db = getDb();
    return db
      .collection("Tables")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAllTables() {
    const db = getDb();
    return db
      .collection("Tables")
      .find()
      .toArray()
      .then((product) => {
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(numTable) {
    const db = getDb();
    return db
      .collection("Products")
      .find({ _id: new mongodb.ObjectId(numTable) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => console.log(err));
  }

  static deleteById(numTable) {
    const db = getDb();
    return db
      .collection("Products")
      .deleteOne({ _id: new mongodb.ObjectId(numTable) })
      .then(result => console.log("Delete"))
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
