var nodemailer = require("nodemailer");
require("dotenv").config();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
async function email_verification(email) {
  const createTransporter = async () => {
    const oauth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "https://developers.google.com/oauthplayground");

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject();
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });

    return transporter;
  };
  const sendEmail = async (emailOptions) => {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(emailOptions);
  };
  var email_auth_otp = Math.floor(1000 + Math.random() * 9000);
  console.log(email_auth_otp);
  sendEmail({
    from: "codejethq@gmail.com",
    to: email,
    subject: "Sending Email using Node.js",
    text: email_auth_otp.toString(),
    html: `<p>codeJET Email verification OTP <h1>${email_auth_otp}</h1></p>`,
  });

  console.log("completed up to here");

  return email_auth_otp;
}
module.exports = email_verification;
