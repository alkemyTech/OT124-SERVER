require("dotenv").config();
const { generateJWT } = require("../helpers/generateJWT");
const {
  generateEncryptedPassword,
} = require("../helpers/generateEncryptedPassword");
const db = require("../models");
const userEntity = "users";
const jwt = require("jsonwebtoken");

const registerUser = async function (req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userFound = await db[userEntity].findOne({
      where: { email: email },
    });
    if (userFound) {
      let err = new Error("User already exists");
      err.name = "ConflictError";
      throw err;
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

const login = async function (req, res, next) {
  try {
    const { email } = req.body;
    const foundOne = await db[userEntity].findOne({ where: { email } });
    if (!foundOne) {
      let err = new Error("User not found, User email invalid");
      err.name = "NotFoundError";
      throw err;
    }
    const firmJWT = {
      email: foundOne.email,
      role: foundOne.role, // "USER" O "ADM"
    };
    const Authorized = jwt.sign(firmJWT, process.env.JWT_SECRET);
    res.json({ Authorized });
  } catch (err) {
    next(err);
  }
};

const getMe = async function (req, res, next) {
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization) {
      let err = new Error("Token not found");
      err.name = "NotFoundError";
      throw err;
    }
    let token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err) => {
      if (err) {
        throw err;
      } else {
        const findEmail = jwt.decode(token, process.env.JWT_SECRET).email;
        const foundOne = await db[userEntity].findOne({
          where: { email: findEmail },
        });
        res.status(200).send(foundOne);
      }
    });
  } catch (error) {
    next(error);
  }
};

const authController = {
  login,
  getMe,
  registerUser,
};

module.exports = authController;
