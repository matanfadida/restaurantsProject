const Order = require("../models/Order");

exports.getOrders = (req, res, next) => {
  Order.fetchAllOrders()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
