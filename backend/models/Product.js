const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(name, price, image, detail, _id) {
    this.name = name;
    this.price = price;
    this.detail = detail;
    this.image = image;
    this._id = _id ? new mongodb.ObjectId(_id) : null;
  }
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("Products")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      dbOp = db.collection("Products").insertOne(this);
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

  static deleteById(proId) {
    const db = getDb();
    return db
      .collection("Products")
      .deleteOne({ _id: new mongodb.ObjectId(proId) })
      .then(result => console.log("Delete"))
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
