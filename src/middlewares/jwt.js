const jwt = require('jsonwebtoken')

const sign = (user) => {
    jwt.sign({
        user
    }, 'secretKey', (err, token) => {
        if (!err) {
            return ({
                err,
                token: null
            })
        } else if (token) {

            return ({
                err: null,
                token
            })
        }

    })
}

const jwtMiddle = {
    sign,
}
module.exports = jwtMiddle