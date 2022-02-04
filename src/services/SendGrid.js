
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


const msgRegister = {
  to: email, // Change to your recipient
  from: 'francotutoriales7@gmail.com', // Change to your verified sender
  subject: 'bienvenidos a  ',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
const msgContact = {
  to: email, // Change to your recipient
  from: 'francotutoriales7@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}