const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");
const { isDev } = require('../middlewares/isRole');
const { validation } = require('../middlewares/validator');
const { contactPostSchema } = require('../validations/contactsSchema');

router.get("/", contactsController.getContacts);

// To save contacts in the db
router.post("/", isDev, validation(contactPostSchema), contactsController.postContact);

module.exports = router;
