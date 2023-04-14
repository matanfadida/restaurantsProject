const express = require("express");

const router = express.Router();
const CategoryController = require('../controller/category');

router.get("/get-category", CategoryController.getCategories);
router.post("/add-category", CategoryController.postAddCategories);

module.exports = router;