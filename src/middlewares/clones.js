const db = require('../models');

const isEmailClone = async (req, res, next) => {
    try {
        const {email} = req.body
        const foundClone = await db['users'].findOne({
            where: { email }
        });
        console.log(foundClone)
        if (foundClone) {
            let err = new Error("Email already exist");
            err.name= 'EmailFoundClone';
            throw err;
        }
        return next()
    } catch (err) {
      next(err);
    }
  };

module.exports = {
    isEmailClone
}