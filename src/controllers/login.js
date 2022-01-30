const jwtMiddle = require("../middlewares/jwt")
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
        if (!email) {
            let err = new Error("the email  wasn't sent")
            err.name = 'ValidationError'
            throw err
        } else if (!password) {
            let err = new Error("the password wasn't sent")
            err.name = 'ValidationError'
            throw err
        } else {
            const resUser = await db[entity].findOne({
                where: {
                    email,
                    password
                }
            })
            console.log("resUser",resUser)
            if (resUser) {
                const resJwt = jwtMiddle.sign(user)
                console.log("resJwt",resJwt)

            }else{
                console.log("que pasó capo")
            }


        }

    } catch (err) {
        next(err)
    }
}

const authController = {
    login,
};

module.exports = authController;