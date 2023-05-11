const mongodb = require("mongodb");
const { getDb } = require("../util/database");

class Details {
  constructor(email, phone, address, _id, instagram, facebook) {
    this.phone = phone; 
    this.email = email;
    this._id = _id ? new mongodb.ObjectId(_id) : null;
    this.address = address;
    this.facebook = facebook;
    this.instagram = instagram;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id != null) {
      console.log('update details')
      dbOp = db
        .collection("Details")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      console.log('add details')
      dbOp = db.collection("Details").insertOne(this);
    }

    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchEmail() {
    const db = getDb();
    return db
      .collection("Details")
      .find()
      .toArray()
      .then((email) => {
        return email;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  static getDetails(email) {
    const db = getDb();
    return db
      .collection("Details")
      .findOne({ email: email })
      .then()
      .catch((err) => console.log(err));
  }

//   static editDetails(oldEmail, updateEmail, updatePhone, updateAddress){
//     const db = getDb();
//     return db
//       .collection("Email")
//       .findOne({ oldEmail: oldEmail })
//       .then(result => result.email = )
//       .catch((err) => console.log(err));
//   }
}
module.exports = Details;
