const express = require("express");

const router = express.Router();
const AuthController = require('../controller/auth');

router.get("/", AuthController.getLogin);
router.get("/get-status-admin", AuthController.IsLogin);
router.post("/", AuthController.postLogin);
router.post("/logout", AuthController.postLogout);
router.post("/signup", AuthController.postSignup);

module.exports = router;