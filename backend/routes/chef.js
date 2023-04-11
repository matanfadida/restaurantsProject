const express = require("express");

const router = express.Router();
const ChefController = require('../controller/chef');

router.get("/getOrders", ChefController.getOrders);
router.post("/edit-status", ChefController.postEditStatusProduct);


router.get("/", (req, res) => {});


module.exports = router;