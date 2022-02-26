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

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteContact = await db[entity].destroy({
      where: {
        id,
      },
    });
    if (!deleteContact) {
      let err = new Error("Contact not found");
      err.name = "NotFoundError";
      throw err;
    }

    res.status(200).send({
      message: "Contact deleted succesfully!",
    });
  } catch (err) {
    next(err);
  }
};

const contactsController = {
  getContacts,
  postContact,
  deleteContact
};

module.exports = contactsController;
