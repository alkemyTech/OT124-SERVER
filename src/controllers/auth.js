require("dotenv").config();
const { generateJWT } = require("../helpers/generateJWT");
const {
  generateEncryptedPassword,
} = require("../helpers/generateEncryptedPassword");
const db = require("../models");
const userEntity = "users";
const jwt = require("jsonwebtoken");
const { SendGrid } = require("../services/SendGrid");

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
      const msgRegister = {
        to: email, // Change to your recipient
        from: 'ong.develop2022@gmail.com', // Change to your verified sender
        subject: `bienvenido a  somos más, ${firstName+ " " +lastName}`,
        text: `esto es un mensaje de verificación por su registro exitoso en somos más, lo estaremos acompañando`,
        
      }
      SendGrid(msgRegister)
      const token = await generateJWT(newUser);
      res.status(201).json({
        token,
      });
    }
  } catch (err) {
    next(err);
  }
};
const getMe = function (req, res, next) {
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
      try {
        const findEmail = jwt.decode(token, process.env.JWT_SECRET).email;
        const foundOne = await db[userEntity].findOne({
          where: { email: findEmail },
        });
        res.status(200).send(foundOne);
      } catch (err) {
        next(err);
      }
    }
  });
};

const login = async (req, res, next) => {
  // CONST { DATA } = REQ.BODY
  const { user } = req;
  try {
    if (user) {
      const token = await generateJWT(user);
      if (token) {
        res.send({
          token,
          user: user,
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

const authController = {
  getMe,
  registerUser,
  login,
};

module.exports = authController;
