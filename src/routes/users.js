var express = require('express');
var router = express.Router();
const userController = require('../controllers/users')

//delete a 'contact' or user
router.delete('/:id', userController.deleteUser );

module.exports = router;