const  authController  = require("../controllers/login");
var express = require('express');
var router = express.Router();

router.post('/login', authController.login)

module.exports = router;