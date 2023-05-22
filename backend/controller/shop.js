const Order = require("../models/Order");
const Comment = require("../models/Comment");
const Product = require("../models/Product");
const Table = require("../models/Table");

exports.postAddOrder = (req, res, io) => {
  const numberTable = req.body.numberTable;
  const price = req.body.price;
  const products = req.body.products;
  const order = new Order(numberTable, price, products);
  order
    .save()
    .then((savedOrder) => {
      Order.fetchAllOrders()
        .then((result) => {
          io.emit("new-order", result);
          // const table = new Table(numberTable, result.map((order) => order.price).reduce(
          //   (accumulator, currentValue) => accumulator + currentValue,
          //   0
          // ));
          // table.save().then(resu => ).catch(err => console.log(err))
          res.json("ok")
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAllProducts()
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const id = req.body.id;
  const getComment = req.body.getComment;

  if (getComment) {
    const productArray = {};
    Product.findById(id)
      .then((product) => {
        productArray["product"] = product;
        Comment.fetchAllCommentForProduct(id)
          .then((comments) => {
            productArray["comments"] = comments;
            res.json(productArray);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    Product.findById(id)
      .then((result) => res.json(result))
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.postUpdateRating = (req, res, next) => {
  const proId = req.params.productId;
  const rating = req.body.rating;
  const comment = req.body.comment;

  Product.findById(proId)
    .then((product) => {
      const counterRating = product.counterRating + 1;
      Product.updateRating(
        proId,
        (product.rating * product.counterRating + rating) / (counterRating),
        counterRating
      )
        .then((result) => {
          if (comment != "") {
            const newComment = new Comment(proId, comment);
            newComment
              .save()
              .then((result) => {res.json('ok');})
              .catch((err) => console.log(err));
          } else {
            res.json(result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.postDeleteProductFromOrder = (req, res, next) => {
  const ordId = req.body.ordId;
  const proGuidId = req.body.proGuidId;
  const numberTable = req.body.numberTable;
  Order.deleteByGuidId(ordId,proGuidId).then(result => Order.fetchAllOrders()
  .then((result) => {
    // const table = new Table(numberTable, result.map((order) => order.price).reduce(
    //   (accumulator, currentValue) => accumulator + currentValue,
    //   0
    // ));
    // table.save().then(resu => res.json(result)).catch(err => console.log(err))
    res.json(result)
  })
  .catch((err) => {
    console.log(err);
  })).catch(err => console.log(err))
}