var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');
const { isAdmin, isAdminOrItself } = require('../middlewares/isRole');
const { validateToken } = require('../middlewares/auth');
const {validation} = require("../middlewares/validator")
const {userUpdateSchema , userCreateSchema} = require("../validations/usersSchema");

//delete a 'contact' or user
//,validation(userDeleteSchema)
router.delete('/:id', validateToken, isAdminOrItself, userController.deleteUser );

// GET of all users, only for admin users
router.get('/', validateToken, isAdmin, userController.getAllUsers);

// GET a user, only for admin users
router.get('/:id', validateToken, isAdmin, userController.getUser);

// UPDATE a user, only for admin users or itself
router.put('/:id', validateToken, isAdmin, validation(userUpdateSchema), userController.updateUser);

// UPDATE a user, only for admin users or itself
router.put('/self/:id', validateToken, isAdminOrItself, userController.updateSelf);

// POST a user, only for admin users and for testing purposes
router.post('/', validateToken, isAdmin, validation(userCreateSchema), userController.postUser);

// Restores a soft deleted user
router.put('/restore/:id', validateToken, isAdmin, userController.restore);

module.exports = router;