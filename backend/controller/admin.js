const Product = require('../models/Product');

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