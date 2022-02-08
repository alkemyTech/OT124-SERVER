const db = require("../models");
const { SendGrid } = require("../services/SendGrid");
const entity = "contacts";

const getContacts = async function (req, res, next) {
  try {
    const contactList = await db[entity].findAll();
    res.json(contactList);
  } catch (err) {
    next(err);
  }
};

const postContact = async function (req, res, next) {
  try {
    const { name, phone, email, message } = req.body;

    const createContact = await db[entity].create({
      name,
      phone,
      email,
      message
    });
    
const msgContact = {
  to: email, // Change to your recipient
  from: 'ong.develop2022@gmail.com', // Change to your verified sender
  subject: 'gracias por contactar con nosotros, '+name,
  text: `queremos agradecerle por mandar su mensaje número:${phone},email:${email} fue creado con éxito, le estaremos contactando en la brevedad`,
  
}
SendGrid(msgContact)
    res.send({
      title: "Contacts",
      message: "contacto creado con exito!",
      newContact: createContact
    });
  } 
  catch (err) {
    next(err);
  }
}

const contactsController = {
  getContacts,
  postContact
};

module.exports = contactsController;
