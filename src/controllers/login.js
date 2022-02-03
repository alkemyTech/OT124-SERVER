const { generateJWT } = require('../helpers/generateJWT')
const login = async (req, res, next) => {

    // CONST { DATA } = REQ.BODY  
    const { user } = req
    try {
        if (user) {
            const token = await generateJWT(user)
            if (token){
                    res.send({
                        token,
                        user: user
                    })
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