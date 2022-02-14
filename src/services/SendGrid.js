require("dotenv").config();
const sgMail = require('@sendgrid/mail')
<<<<<<< HEAD
require("dotenv").config();
const KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(KEY)
=======
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
>>>>>>> 8113f2d96c94952a7ce6e17b51e25a828e7ee8d5


}

module.exports = {
  SendGrid
}