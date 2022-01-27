const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");

router.get("/", contactsController.getContacts);

module.exports = router;
