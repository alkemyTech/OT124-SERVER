const isEmailClone = async (req, res, next) => {
    const {email} = req.body

    try {
        const foundClone = await db[entity].findOne({
            where: { email }
        });
        if (foundClone) {
            let err = new Error("Email already exist");
            err.name= 'EmailFoundClone';
            throw err;
        }
        next()
    } catch (err) {
      next(err);
    }
  };

module.exports = {
    isEmailClone
}