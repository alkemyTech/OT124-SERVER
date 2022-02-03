var express = require('express');
var router = express.Router();

const loginController  = require("../controllers/login");
const authController = require("../controllers/auth");
const { validation } = require("../middlewares/validator");
const { registerSchema ,loginSchema } = require("../validations/authSchema");
const { matchCredentials } = require('../middlewares/auth');


router.post('/login',validation(loginSchema), matchCredentials,  loginController.login)
router.post("/register",validation(registerSchema), authController.registerUser);
router.get("/me", authController.getMe);

module.exports = router;
