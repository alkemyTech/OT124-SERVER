var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');
const { isAdmin, isAdminOrItself } = require('../middlewares/isRole');
const { validateToken } = require('../middlewares/auth');

//delete a 'contact' or user
//,validation(userDeleteSchema)
router.delete('/:id', validateToken, isAdminOrItself, userController.deleteUser );

// GET of all users, only for admin users
router.get('/', validateToken, isAdmin, userController.getAllUsers);

module.exports = router;