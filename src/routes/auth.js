const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { validation } = require("../middlewares/validator");
const { registerSchema } = require("../validations/authSchema");

router.post(
  "/register",
  validation(registerSchema),
  authController.registerUser
);
router.post("/login", authController.login);

router.get("/me", authController.getMe);

module.exports = router;
