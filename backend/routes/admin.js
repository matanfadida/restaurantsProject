const express = require("express");

const router = express.Router();
const adminController = require('../controller/admin');

router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

router.get("/tables/:numTable", adminController.getTables);

router.post("/payment", adminController.postPayOnTable);

router.post("/get-payment", adminController.getPayOnTable);

router.post("/delete-table", adminController.postDeleteTable);

router.post("/delete-comment", adminController.postDeleteComment);

router.get("/tables", adminController.getAllTable);

router.get("/", (req, res, next) => {
    console.log('admin')
    res.send('<h1>hello</h1>')
});


module.exports = router;