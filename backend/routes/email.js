const express = require("express");

const router = express.Router();
const EmailController = require('../controller/email');

router.post('/send-email', (req, res) => {
    EmailController.postSendEmail(req, res, req.app.get('transporter'));
  });

module.exports = router;