require("dotenv").config();
const sgMail = require('@sendgrid/mail')
const KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(KEY)

const SendGrid = async (msg) => {

  try {

    const resSend = await sgMail.send(msg)
    console.log(resSend)
  }
  catch (err) {
    console.log(err)
  }


}

module.exports = {
  SendGrid
}