const db = require('../models')
require("dotenv").config();

const login = async function (req, res , next) {
    try {
        const {email} = req.body
        const foundOne = await db['Users'].findOne({ where: { email: email } })
        if (!foundOne) {
            let err = new Error('User not found, User email invalid')
            err.name = 'NotFoundError'
            throw err
        }
        const firmJWT = {
            email: foundOne.email,
            role: foundOne.role // "USER" O "ADM"
        };
        const Authorized = jwt.sign(firmJWT, process.env.JWTPASSWORD);
        res.json({Authorized})
    } catch (err) {
        next(err)
    }
}

const authController = {
    login
};

module.exports = authController;