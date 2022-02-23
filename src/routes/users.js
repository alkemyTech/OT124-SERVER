var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');
const { validation } = require('../middlewares/validator');
const { userUpdateSchema, userCreateSchema } = require('../validations/usersSchema');
const { isAdmin } = require('../middlewares/isRole');
const { validateToken } = require('../middlewares/auth');

// DELETE a 'contact' or user
router.delete('/:id', validateToken, isAdmin, userController.deleteUser);

// GET of all users, only for admin users
router.get('/', validateToken, isAdmin, userController.getAllUsers);

// GET a user, only for admin users
router.get('/:id', validateToken, isAdmin, userController.getUser);

// UPDATE a user, only for admin users
router.put('/:id', validateToken, isAdmin, validation(userUpdateSchema), userController.updateUser);

// POST a user, only for admin users and for testing purposes
router.post('/', validateToken, isAdmin, validation(userCreateSchema), userController.postUser);

// Restores a soft deleted user
router.put('/restore/:id', validateToken, isAdmin, userController.restore);

module.exports = router;