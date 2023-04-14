const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Category {
  constructor(value, label) {
    this.value = value;
    this.label = label;
  }
  save() {
    const db = getDb();
    return db
      .collection("Category")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static fetchAllCategories() {
    const db = getDb();
    return db
      .collection("Category")
      .find()
      .toArray()
      .then((category) => {
        return category;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(ordId) {
    const db = getDb();
    return db
      .collection("Category")
      .find({ _id: new mongodb.ObjectId(ordId) })
      .next()
      .then((order) => {
        return order;
      })
      .catch((err) => console.log(err));
  }

}

module.exports = Category;
