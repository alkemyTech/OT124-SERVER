const db = require('../models')
require("dotenv").config();
const entity = 'users'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const validateToken = async (req, res, next) => {

    try {
        const { authorization } = req.headers;
        if (!authorization) {
            let err = new Error('Token not found')
            err.name = 'NotFoundError'
            throw err
        }
        let token = authorization.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                throw err
            } else {
                req.user=decoded.id
                req.role=decoded.role
            }
        })
        next();

    } catch (error) {
         next(error)
    }
}

const matchCredentials = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const resUser = await db[entity].findOne({ where: { email: email },
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            }, })

        if (!resUser) {
            let err = new Error("User does not exist");
            err.name = "AuthorizationError";
            throw err;
        }

        if (!bcrypt.compareSync(password, resUser.password)) {
            let err = new Error("Password invalid");
            err.name = "AuthorizationError";
            throw err;
        }
        req.user=resUser
        next();

    } catch (err) {
        next(err)
    }
}

const authController = {
    validateToken,
    matchCredentials
};

module.exports = authController;