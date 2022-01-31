const db = require('../models');
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

const getMe = async function (req, res, next) {
    try {
        const { Authorization } = req.headers;
        if (!Authorization) {
            let err = new Error('Token not found')
            err.name = 'NotFoundError'
            throw err
        }
        let token = Authorization.split(' ')[1];

        jwt.verify(token, process.env.PASSWORD, (err) => {
            if(err) {
                throw err
            } else {
                const findEmail = jwt.decode(token,process.env.PASSWORD).email
                const foundOne = await db['users'].findOne({ where: { email: findEmail } })
                res.status(200).send(foundOne)
            }
        })

    } catch (error) {
        throw error
    }
}

const authController = {
    login,
    getMe
};

module.exports = authController;