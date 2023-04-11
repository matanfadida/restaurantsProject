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

// exports.postEditStatusProduct = (req, res, next) => {
//   const proId = req.body.idProduct;
//   const ordId = req.body.idOrder;
//   const status = req.body.status;
//   console.log('rest');
//   Order.findById(ordId)
//     .then((order) => {
//       Order.updateStatusProduct(ordId, status, order.products, proId)
//       .then(result => res.json("ok"))
//       .catch(err => console.log(err))
//     })
//     .catch(res.json("error"));
// };
exports.postEditStatusProduct = (req, res, next) => {
  const proId = req.body.idProduct;
  const ordId = req.body.idOrder;
  const status = req.body.status;
  console.log('rest');
  Order.findById(ordId)
    .then((order) => {
      Order.updateStatusProduct(ordId, status, order.products, proId)
        .then(result => res.json("ok"))
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