const express = require("express");

const router = express.Router();
const adminController = require('../controller/admin');

router.post("/add-product", adminController.postAddProduct);

router.get("/", (req, res, next) => {
    console.log('admin')
    res.send('<h1>hello</h1>')
});


module.exports = router;