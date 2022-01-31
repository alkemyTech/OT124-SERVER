const db = require('../models')
require("dotenv").config();

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


const authController = {
    validateToken
};

module.exports = authController;