const mongodb = require("mongodb");
const { getDb } = require("../util/database");

class Email {
  constructor(email, phone, address) {
    (this.phone = phone), (this.email = email) (this.address = address);
  }

  save() {
    const db = getDb();
    return db
      .collection("Email")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static getDetails(email) {
    const db = getDb();
    return db
      .collection("Email")
      .findOne({ email: email })
      .then()
      .catch((err) => console.log(err));
  }
}
module.exports = Admin;
