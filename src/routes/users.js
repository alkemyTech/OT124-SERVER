var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');
const {  validationIdParams } = require('../middlewares/validator');
const { userDeleteSchema } = require('../validations/usersSchema');

//delete a 'contact' or user
//,validation(userDeleteSchema)
router.delete('/:id', validationIdParams(userDeleteSchema), userController.deleteUser );

module.exports = router;