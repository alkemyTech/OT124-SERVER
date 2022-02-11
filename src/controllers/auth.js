require("dotenv").config();
const { generateJWT } = require("../helpers/generateJWT");
const {
  generateEncryptedPassword,
} = require("../helpers/generateEncryptedPassword");
const db = require("../models");
const userEntity = "users";
const jwt = require("jsonwebtoken");
const { SendGrid } = require("../services/SendGrid");
const { OAuth2Client} = require("google-auth-library");
const { RegisterSendGrid } = require("../helpers/SenderSchema");


const client = new OAuth2Client(process.env.API_CLIENT_ID)

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
      const resMsg = RegisterSendGrid(user)
      SendGrid(resMsg)
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

const googleAuth = async (req, res, next) => {
  const { tokenId } = req.body;
  try {
    const {payload}= await client.verifyIdToken({idToken: tokenId, audience: process.env.API_CLIENT_ID})
    const {email, name, email_verified} = payload
    if (email_verified){
      const user = await db[userEntity].findOne({where: { email: email }})
      if (user){
        const token = await generateJWT(user);
        return res.send({
          token,
          user: user,
        });
      }
      else{
         const password = await generateEncryptedPassword(email);
         const [ firstName, lastName ] = name.split(' ')
         const userCreated = await db[userEntity].create({email, firstName, lastName, password})
         const token = await generateJWT(userCreated);
          return res.send({
          token,
          user: userCreated,
        });
      }
    }
   } 
   catch (err) {
    next(err);
  }
};


const authController = {
  getMe,
  registerUser,
  login,
  googleAuth
};

module.exports = authController;
