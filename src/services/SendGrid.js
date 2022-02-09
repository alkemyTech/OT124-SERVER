require("dotenv").config();
const sgMail = require('@sendgrid/mail')
const KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(KEY)

 const SendGrid = (msg) => {

     
      sgMail
        .send(msg)
        .then((response) => {
          console.log(response[0].statusCode)
          console.log(response[0].headers)
        })
        .catch((error) => {
          console.error(error)
        })
}




module.exports = {
  SendGrid
}