const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");
const { isDev } = require('../middlewares/isRole');
const { validation } = require('../middlewares/validator');
const { contactPostSchema } = require('../validations/contactsSchema');
const { validateToken } = require('../middlewares/auth');

router.get("/", contactsController.getContacts);

// To save contacts in the db
router.post("/", validateToken, validation(contactPostSchema), contactsController.postContact);

module.exports = router;
