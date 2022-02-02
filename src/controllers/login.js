const jwt = require('jsonwebtoken')
const db = require("../models")

const entity = 'users'

const login = async (req, res, next) => {

    // CONST { DATA } = REQ.BODY  
    const { email } = req.body
    try {
        const resUser = await db[entity].findOne({
            where: { email: email }
        })
        if (resUser) {
            jwt.sign({
                user: resUser.dataValues
            }, 'secretKey', (err, token) => {
                if (!token) {
                    res.send({
                        err,
                        token: null
                    })
                } else if (token) {
                    res.send({
                        err: null,
                        token
                    })
                }
            })
        }
    } catch (err) {
        next(err)
    }
}

const authController = {
    login,
};

module.exports = authController;