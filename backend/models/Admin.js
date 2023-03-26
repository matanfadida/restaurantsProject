const mongodb = require("mongodb");
const { getDb } = require("../util/database");

class Admin {
  constructor(email, password) {
    (this.password = password), (this.email = email);
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

  static findByEmail(email) {
    const db = getDb();
    return db
      .collection("Admins")
      .findOne({ email: email })
      .then()
      .catch((err) => console.log(err));
  }
}
module.exports = Admin;
