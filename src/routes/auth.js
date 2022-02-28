var express = require('express');
var router = express.Router();
const authController = require("../controllers/auth");
const { validation } = require("../middlewares/validator");
const { registerSchema ,loginSchema } = require("../validations/authSchema");
const { matchCredentials, validateToken } = require('../middlewares/auth');


router.post('/login', validation(loginSchema), matchCredentials,  authController.login)
router.post('/googleAuth', authController.googleAuth)
router.post("/register",validation(registerSchema), authController.registerUser);
router.get("/me", validateToken, authController.getMe);

module.exports = router;
