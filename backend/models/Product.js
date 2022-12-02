const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(name, price, image, detail) {
    this.name = name;
    this.price = price;
    this.detail = detail;
    this.image = image;
  }
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp
        .collection("Products")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      dbOp.collection("Products").insertOne(this);
    }

    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAllProducts() {
    const db = getDb();
    return db
      .collection("Products")
      .find()
      .toArray()
      .then((product) => {
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(proId) {
    const db = getDb();
    return db
      .collection("Products")
      .find({ _id: new mongodb.ObjectId(proId) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
