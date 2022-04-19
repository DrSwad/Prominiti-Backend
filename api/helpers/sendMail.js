const nodemailer = require("nodemailer");
const { transporterConfig, templates } = require("../../config/mail");
const { env } = require("../../config");

const config = transporterConfig[env];
const transporter = nodemailer.createTransport({ ...config });

async function sendMail(to, template, data) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Prominiti Team" <support@prominiti.com>', // sender address
    to, // list of comma separated receivers
    ...templates[template](data),
  });

  // eslint-disable-next-line no-console
  console.log("Mail sent: %s", info.messageId);
}

module.exports = sendMail;
