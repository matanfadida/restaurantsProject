const express = require("express");

const router = express.Router();
const AuthController = require('../controller/auth');

router.get("/", AuthController.getLogin);
router.post("/", AuthController.postLogin);


module.exports = router;