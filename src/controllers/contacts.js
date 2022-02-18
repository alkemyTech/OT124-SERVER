const { ContactSendGrid } = require("../helpers/SenderSchema");
const db = require("../models");
const { SendGrid } = require("../services/SendGrid");
const entity = "contacts";

const getContacts = async function (req, res, next) {
  try {
    const contactList = await db[entity].findAll();

    return res.send({
      title: "Contacts",
      contactList,
    });

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
      message,
    });

    const resMsgContact = ContactSendGrid(req.body);
    SendGrid(resMsgContact);

    return res.send({
      title: "Contacts",
      message: "contacto creado con exito!",
      createContact,
    });
  } catch (err) {
    next(err);
  }
};

const contactsController = {
  getContacts,
  postContact,
};

module.exports = contactsController;
