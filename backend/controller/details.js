const Details = require("../models/DetailsRestorent");

exports.postSendEmail = (req, res, transporter) => {
  const { name, email, subject, message } = req.body;
  Details.fetchEmail()
  .then((emailDetails) => {
    const ownerEmail = emailDetails != null ? emailDetails[0].email : "default@gmail.com";
    const mailOptions = {
        from: "matantestweb@gmail.com",
        to: ownerEmail,
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
          res.json("ok");
        }
      });
  })
  .catch((err) => console.log(err));
};

exports.getDetails = (req, res, next) => {
  Details.fetchEmail()
      .then((emailId) => res.json(emailId))
      .catch((err) => console.log(err));
  };

exports.postEditDetails = (req, res, next) => {
  const emailId = req.body.emailId;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;
  const facebook = req.body.facebook;
  const instagram = req.body.instagram;
  const detailsObject = new Details(email, phone, address, emailId, instagram, facebook);
  detailsObject
    .save()
    .then((result) => res.json("ok"))
    .catch((err) => console.log(err));
};
