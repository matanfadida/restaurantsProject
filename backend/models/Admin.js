const mongodb = require("mongodb");
const { getDb } = require("../util/database");

class Admin {
  constructor(userName, email) {
    (this.userName = userName), (this.email = email);
  }

  save() {
    const db = getDb();
    return db
      .collection("Admins")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("Admins")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then()
      .catch((err) => console.log(err));
  }
}
module.exports = Admin;
