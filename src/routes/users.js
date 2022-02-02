var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');
const {  validationIdParams } = require('../middlewares/validator');
const { userDeleteSchema } = require('../validations/usersSchema');
const { isAdmin } = require('../middlewares/isRole');

//delete a 'contact' or user
//,validation(userDeleteSchema)
router.delete('/:id', userController.deleteUser );

// GET of all users, only for admin users
router.get('/', isAdmin, userController.getAllUsers);

module.exports = router;