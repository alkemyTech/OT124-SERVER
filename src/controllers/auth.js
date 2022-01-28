const db = require("../models");
const userEntity = "users";
const { generateJWT } = require("../helpers/generateJWT");
const {
  generateEncryptedPassword,
} = require("../helpers/generateEncryptedPassword");

const registerUser = async function (req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userFound = await db[userEntity].findOne({
      where: { email: email },
    });
    if (userFound) {
      return res.status(409).send({
        title: "Register",
        message: "User already exists",
      });
    } else {
      passwordHash = await generateEncryptedPassword(password);
      const newUser = await db[userEntity].create({
        firstName,
        lastName,
        email,
        password: passwordHash,
      });
      const user = await db[userEntity].findOne({
        where: { id: newUser.id },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
        },
      });
      const token = await generateJWT(newUser);
      res.status(201).json({
        token,
        user,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
};
