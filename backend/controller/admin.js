const Product = require("../models/Product");

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const img = req.body.img;
  const detail = req.body.detail;
  const product = new Product(name, price, img, detail);
  product
    .save()
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const proId = req.params.productId;
  Product.findById(proId)
    .then((product) => res.json(product))
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const proId = req.body.productId;
  const Updatename = req.body.name;
  const Updateprice = req.body.price;
  const Updateimg = req.body.img;
  const Updatedetail = req.body.detail;
  const product = new Product(
    Updatename,
    Updateprice,
    Updateimg,
    Updatedetail,
    proId
  );
  product
    .save()
    .then((result) => console.log("Update"))
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const proId = req.body.productId;
  Product.deleteById(proId)
    .then((result) => console.log("Delete"))
    .catch((err) => console.log(err));
};
