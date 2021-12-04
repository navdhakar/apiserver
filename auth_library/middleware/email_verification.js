var nodemailer = require("nodemailer");
require("dotenv").config();

async function email_verification(email) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "codejethq@gmail.com",
      pass: "rancid@acid432",
    },
  });
  var email_auth_otp = Math.floor(1000 + Math.random() * 9000);
  console.log(email_auth_otp);
  var mailOptions = {
    from: "codejethq@gmail.com",
    to: email,
    subject: "Sending Email using Node.js",
    text: email_auth_otp.toString(),
    html: `<p>codeJET Email verification OTP <h1>${email_auth_otp}</h1></p>`,
  };
  console.log("completed up to here");
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return email_auth_otp;
}
module.exports = email_verification;
