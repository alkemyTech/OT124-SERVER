const db = require("../models");
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
