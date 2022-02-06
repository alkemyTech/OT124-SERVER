
const sgMail = require('@sendgrid/mail')
const { SENDGRID_API_KEY } = require('../constants/SendGridApiKey')
sgMail.setApiKey(SENDGRID_API_KEY)

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