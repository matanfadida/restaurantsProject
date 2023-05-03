const express = require("express");

const router = express.Router();
const EmailController = require('../controller/email');

router.post('/send-email', (req, res) => {
    EmailController.postSendEmail(req, res, req.app.get('transporter'));
  });

router.post('/add-email', EmailController.postEditDetails);

router.get('/get-email', EmailController.getEmail);

router.post('/edit-email', EmailController.postEditDetails);

module.exports = router;