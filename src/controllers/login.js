const jwt = require('jsonwebtoken')
const db = require("../models")

const entity = 'users'

const login = async (req, res, next) => {

    const {
        email,
        password
    } = req.body
    try {
        let user = {
            email,
            password
        }


        const resUser = await db[entity].findOne({
            where: {
                email,
                password
            }
        })
        console.log("resUser", resUser)
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