var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');
const { validation } = require('../middlewares/validator');
const { userDeleteSchema } = require('../validations/usersSchema');

//delete a 'contact' or user
router.delete('/:id',validation(userDeleteSchema), userController.deleteUser );

module.exports = router;