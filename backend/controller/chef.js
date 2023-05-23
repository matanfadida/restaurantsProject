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


exports.postEditStatusProduct = (req, res, io) => {
  const proId = req.body.idProduct;
  const ordId = req.body.idOrder;
  const status = req.body.status;
  const numberTable = req.body.numberTable;
  console.log('rest');
  Order.findById(ordId)
    .then((order) => {
      Order.updateStatusProduct(ordId, status, order.products, proId)
        .then(update => Order.fetchAllOrders()
        .then((result) => {
          const orderByTable = result.filter(num => num.numberTable == numberTable);
          res.json('ok');
          io.emit("update-status-product", {orderByTable, numberTable});
        })
        .catch((err) => {
          console.log(err);
        }))
        .catch(err => {
          console.log(err);
          res.status(500).json("error");
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json("error");
    });
};