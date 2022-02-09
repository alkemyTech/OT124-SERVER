
const sgMail = require('@sendgrid/mail')
require("dotenv").config();
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



// const msgContact = {
//   to: email, // Change to your recipient
//   from: 'ong.develop2022@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }

module.exports = {
  SendGrid
}