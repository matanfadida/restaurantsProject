const express = require("express");

const router = express.Router();
const shopController = require("../controller/shop");

router.post("/api/add-order", shopController.postAddOrder);

router.use("/api", shopController.getProduct);

module.exports = router;