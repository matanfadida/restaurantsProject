const Order = require("../models/Order");
const Product = require("../models/Product");

exports.postAddOrder = (req, res, next) => {
  const numberTable = req.body.numberTable;
  const price = req.body.price;
  const products = req.body.products;
  const order = new Order(numberTable, price, products);
  order
    .save()
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  Product.fetchAllProducts()
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
    });
};
