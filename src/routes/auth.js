var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth')

/* AUTH - Login form - Generate Token */
router.post('/', authController.login)

module.exports = router;
