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

const contactsController = {
  getContacts,
};

module.exports = contactsController;
