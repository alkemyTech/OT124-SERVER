const  loginController  = require("../controllers/login");
var express = require('express');
var router = express.Router();

const authController = require("../controllers/auth");
const { validation } = require("../middlewares/validator");
const { registerSchema } = require("../validations/authSchema");
const { loginSchema } = require("../validations/loginSchema");

router.post('/login',validation(loginSchema), loginController.login)

router.post(
  "/register",
  validation(registerSchema),
  authController.registerUser
);
router.post("/login", authController.login);

router.get("/me", authController.getMe);

module.exports = router;
