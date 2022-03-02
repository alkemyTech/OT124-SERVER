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
const getMe = async function (req, res, next) {
      const { id } = req.user
  try {
  
    const me = await db[userEntity].findOne({where: { id: id },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
      }})

      if (!me){
        let err = new Error("User not found");
      err.name = "NotFoundError";
      throw err;
      }

      res.send({ user: me })
    
  } catch (error) {
    next(error)
  }

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
        return res.status(200).send({
          token,
        });
      }
      else{
         const password = await generateEncryptedPassword(email);
         const [ firstName, lastName ] = name.split(' ')
         const userCreated = await db[userEntity].create({email, firstName, lastName, password})
         const token = await generateJWT(userCreated);
          return res.status(201).send({
          token,
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
