const mongodb = require("mongodb");
const { getDb } = require("../util/database");

class Table {
  constructor(numberTable, sum, tip) {
    this.numberTable = numberTable;
    this.sum = sum;
    this.tip = tip;
  }

  async save() {
    const db = getDb();
    let dbOp;
    const result = await db.collection("Tables").find().toArray();
    const findTable = result.find(table => table.numberTable === this.numberTable);
    console.log('as',findTable)
    if (findTable) {
      console.log('update')
      dbOp = db
        .collection("Tables")
        .updateOne({ numberTable: this.numberTable }, { $set: this });
    } else {
      console.log('add')
      dbOp = db.collection("Tables").insertOne(this);
    }

    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findByNumberTable(number) {
    const db = getDb();
    return db.collection("Tables")
      .findOne({ numberTable: +number })
      .then(res => {
        return res; // return the result of the query
      })
      .catch((err) => {
        return null; // return null if there was an error
      });
  }
}
module.exports = Table;
