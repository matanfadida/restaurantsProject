const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Comment {
  constructor(proId, comment, _id) {
    this.proId = proId;
    this.comment = comment;
    this._id = _id ? new mongodb.ObjectId(_id) : null;
  }
  save() {
    const db = getDb();
    let dbOp;
    if (this._id != null) {
      console.log('update')
      dbOp = db
        .collection("Comments")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      console.log('add')
      dbOp = db.collection("Comments").insertOne(this);
    }

    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAllCommentForProduct(proId) {
    const db = getDb();
    return db
      .collection("Comments")
      .find({ proId: proId })
      .toArray()
      .then((comments) => {
        return comments;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findByProId(proId) {
    const db = getDb();
    return db
      .collection("Comments")
      .find({ _id: new mongodb.ObjectId(proId) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => console.log(err));
  }

  static deleteCommentByProductId(proId) {
    const db = getDb();
    return db
      .collection("Comments")
      .deleteOne({ _id: new mongodb.ObjectId(proId) })
      .then(result => console.log("Delete"))
      .catch((err) => console.log(err));
  }
}

module.exports = Comment;
