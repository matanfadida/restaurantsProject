const Product = require("../models/Product");

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const img = req.body.img;
  const detail = req.body.detail;
  console.log('asda');
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
  console.log(proId)
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

const Order = require("../models/Order");

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
const ass = [1,2,3,4,5,6,7,8,9,10]

exports.getAllTable = (req, res, next) => {
  const arrayOfTable = []
  let arr = []
  Order.fetchAllOrders()
  .then((result) => {
      ass.forEach(number => {
        let totalPrice = 0
          result.forEach(element => {
              if(element.numberTable === number){
                  totalPrice += element.price;
              }
          })
          if(result[number] == undefined){
            return;
          }
          arrayOfTable.push({_id:result[number]._id, numberTable:number ,totalPrice:totalPrice});
          arr = []
      });
    res.json(arrayOfTable);
  })
  .catch((err) => {
    console.log(err);
  });
}