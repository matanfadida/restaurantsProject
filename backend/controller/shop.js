const Order = require("../models/Order");

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
