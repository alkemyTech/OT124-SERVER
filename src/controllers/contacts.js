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
  // ToDo: hacer la logica del controlador
  try {
    const { name, phone, message } = req.body;

    const createMember = await db[entity].create({
      
    });
    // res.send({
    //   title: "Members",
    //   message: "Miembro creado con exito!",
    //   newMember: createMember
    // });
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
