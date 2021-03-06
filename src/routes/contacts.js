const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");
const { isDev, isAdmin } = require('../middlewares/isRole');
const { validation } = require('../middlewares/validator');
const { contactPostSchema } = require('../validations/contactsSchema');
const { validateToken } = require('../middlewares/auth');

router.get("/", contactsController.getContacts);

// To save contacts in the db
router.post("/", validation(contactPostSchema), contactsController.postContact);

router.delete("/:id", validateToken, isAdmin, contactsController.deleteContact);

module.exports = router;
