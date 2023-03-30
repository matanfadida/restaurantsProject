const express = require("express");

const router = express.Router();
const shopController = require("../controller/shop");

router.post("/api/add-order", shopController.postAddOrder);

router.use("/api/get-product", shopController.getProduct);

router.post("/api/update-rating/:productId", shopController.postUpdateRating)

router.use("/api", shopController.getProducts);

module.exports = router;