const express = require("express");

const router = express.Router();
const EmailController = require('../controller/details');

router.post('/send-email', (req, res) => {
    EmailController.postSendEmail(req, res, req.app.get('transporter'));
  });

router.post('/add-details', EmailController.postEditDetails);

router.get('/get-details', EmailController.getDetails);

router.post('/edit-details', EmailController.postEditDetails);

module.exports = router;