const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Category {
  constructor(worker, category) {
    this.worker = worker;
    this.category = category;
  }
  save() {
    const db = getDb();
    return db
      .collection("Categorys")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static fetchAllCategoriesByWorker(worker) {
    const db = getDb();
    return db
      .collection("Categorys")
      .find({ worker: worker })
      .toArray()
      .then((category) => {
        return category;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAllCategories() {
    const db = getDb();
    return db
      .collection("Categorys")
      .find()
      .toArray()
      .then((category) => {
        return category;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(worker, value) {
    const db = getDb();
    return db
      .collection("Categorys")
      .find({ worker: worker })
      .next()
      .then((categorys) => {
        const result = categorys.category.find((item) => item.value == value);
        return result;
      })
      .catch((err) => console.log(err));
  }

  static deleteAll(worker) {
    const db = getDb();
    return db
      .collection("Categorys")
      .deleteMany({ worker: worker })
      .then((result) => {
        return result.deletedCount;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Category;
