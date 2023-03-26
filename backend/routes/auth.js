const express = require("express");

const router = express.Router();
const AuthController = require('../controller/auth');

router.get("/", AuthController.getLogin);
router.post("/", AuthController.postLogin);
router.post("/logout", AuthController.postLogout);
router.post("/signup", AuthController.postSignup);


module.exports = router;