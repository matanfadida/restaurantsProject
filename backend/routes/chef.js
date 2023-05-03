const express = require("express");

const router = express.Router();
const ChefController = require('../controller/chef');

router.get("/getOrders", ChefController.getOrders);
router.post("/edit-status", (req, res) => {
    ChefController.postEditStatusProduct(req, res, req.app.get('io'));
  });

router.get("/", (req, res) => {});


module.exports = router;