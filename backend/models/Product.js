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
    db.collection("Products")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

exports.module = Product;
