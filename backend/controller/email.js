exports.postSendEmail = (req, res, transporter) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
      from: 'matanfadida7@gmail.com',
      to: 'haimrubin1@gmail.com',
      subject: subject,
      text: "קליפה"
    //   text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`
    };
    console.log('asdas')
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send('Error');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Success');
      }
    });
  }