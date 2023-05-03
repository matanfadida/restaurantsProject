const Email = require("../models/Email");

exports.postSendEmail = (req, res, transporter) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: "matanfadida7@gmail.com",
    to: "haimrubin1@gmail.com",
    subject: subject,
    text: "קליפה",
    //   text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`
  };
  console.log("asdas");
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Success");
    }
  });
};

exports.postEditDetails = (req, res, next) => {
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;
  const emailObject = new Email(email, phone, address);
  emailObject
    .save()
    .then((result) => res.json('ok'))
    .catch((err) => console.log(err));
};
