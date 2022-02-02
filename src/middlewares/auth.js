const db = require('../models')
require("dotenv").config();
const entity = 'users'

const validateToken = (req, res, next) => {

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
                next();
            }
        })

    } catch (error) {
        throw error
    }
}

const matchPassword = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const resUser = await db[entity].findOne({ where: { email: email } })

        if (!resUser) {
            let err = new Error("UserNotExist");
            err.name = "User does not exist";
            throw err;
        }

        if (!bcrypt.compareSync(password, resUser.password)) {
              return res.status(403).send('Contraseña invalida');
        }
        next();

    } catch (err) {
        next(err)
    }
}

const authController = {
    validateToken,
    matchPassword
};

module.exports = authController;