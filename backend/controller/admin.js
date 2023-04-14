const Product = require("../models/Product");
const Order = require("../models/Order");

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const img = req.body.img;
  const detail = req.body.detail;
  const category = req.body.category;
  const product = new Product(name, price, img, detail, category);
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
  const rating = req.body.rating;
  const product = new Product(
    Updatename,
    Updateprice,
    Updateimg,
    Updatedetail,
    proId,
    rating
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

exports.getTables = (req, res, next) => {
  const numTable = req.params.numTable;
  Order.fetchAllOrders()
    .then((result) => {
      const orderByTable = result.filter(num => num.numberTable == numTable);
      res.json(orderByTable);
    })
    .catch((err) => {
      console.log(err);
    });
};
const NUMBERTABLE = [1,2,3,4,5,6,7,8,9,10]

exports.getAllTable = (req, res, next) => {
  const arrayOfTable = []
  let flag = true;
  let flag2 = false;
  Order.fetchAllOrders()
  .then((result) => {
    NUMBERTABLE.forEach(number => {
        let totalPrice = 0
          result.forEach(element => {
              if(element.numberTable === number){
                  totalPrice += element.price;
                  flag2 = true;
              }
          })
          if(result[0] != undefined && flag){
            flag = false;
            arrayOfTable.push({_id:result[0]._id, numberTable:1 ,totalPrice:totalPrice});
          }
          if(flag2 && number-1 != 0){
            arrayOfTable.push({_id:Math.random(), numberTable:number ,totalPrice:totalPrice});
          }
          flag2 = false;
      });
    res.json(arrayOfTable);
  })
  .catch((err) => {
    console.log(err);
  });
}