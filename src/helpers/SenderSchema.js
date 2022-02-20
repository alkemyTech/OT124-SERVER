

function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString("base64");
  }
const RegisterSendGrid = (user) => {
    const msgRegister = {
        to: user.email, // Change to your recipient
        from: 'ong.develop2022@gmail.com', // Change to your verified sender
        subject: `bienvenido a  somos más, ${user.firstName + " " + user.lastName}`,
        text: `esto es un mensaje de verificación por su registro exitoso en somos más, lo estaremos acompañando`,
        

    }
    return msgRegister
}
const ContactSendGrid = (user) => {
    const msgContact = {
        to: user.email, // Change to your recipient
        from: 'ong.develop2022@gmail.com', // Change to your verified sender
        subject: 'gracias por contactar con nosotros, ' + user.name,
        text: `queremos agradecerle por mandar su mensaje con su 
        teléfono:${user.phone},
        email: ${user.email}
         fue creado con éxito, le estaremos contactando en la brevedad`,
        // attachments: [
        //     {
        //         filename: 'logo-somos-mas.png',
        //         type: 'image/png',
        //         content_id: 'logo',
        //         content: base64str,
        //         disposition: 'inline'
        //     }
        // ],
    }
    return msgContact
}
module.exports = {
    RegisterSendGrid,
    ContactSendGrid
}