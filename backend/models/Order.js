const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Order {
  constructor(numberTable, price, products) {
    this.numberTable = numberTable;
    this.price = price;
    this.products = products;
  }
  save() {
    const db = getDb();
    return db
      .collection("Orders")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static fetchAllOrders() {
    const db = getDb();
    return db
      .collection("Orders")
      .find()
      .toArray()
      .then((orders) => {
        return orders;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(ordId) {
    const db = getDb();
    return db
      .collection("Orders")
      .find({ _id: new mongodb.ObjectId(ordId) })
      .next()
      .then((order) => {
        return order;
      })
      .catch((err) => console.log(err));
  }

  // static deleteByGuidId(proGuidId) {
  //   const db = getDb();
  //   return db
  //     .collection("Products")
  //     .deleteOne({ _id: new mongodb.ObjectId(proId) })
  //     .then(result => console.log("Delete"))
  //     .catch((err) => console.log(err));
  // }

  static async deleteByGuidId(ordId, proGuidId) {
    const db = getDb();
    const result = await db.collection("Orders").find({ _id: new mongodb.ObjectId(ordId) }).toArray();
    const products = result[0].products.filter(product => product.guid_id !== proGuidId);

    const sum = products.map(product => product.price).reduce((acc, cur) => acc + cur, 0);
    if(products.length === 0){
      await db.collection("Orders").deleteOne(
        { _id: new mongodb.ObjectId(ordId) }
      ).then((result) => console.log(result))
         .catch((err) => console.log(err));
    }else{
      await db.collection("Orders").updateOne(
        { _id: new mongodb.ObjectId(ordId) },
        { $set: { products: products, price: sum} }
      ).then((result) => console.log(result))
         .catch((err) => console.log(err));
    }
  }

  static updateStatusProduct(ordId, status, products, proId){
    const db = getDb();
    const existingProductIndex = products.findIndex(product => product.guid_id === proId)
    products[existingProductIndex].status = status;
    
    return db
    .collection("Orders")
    .updateOne({ _id: new mongodb.ObjectId(ordId) }, { $set: { products: products} })
    .then(result => console.log(result))
    .catch((err) => console.log(err));
  }

}

module.exports = Order;
