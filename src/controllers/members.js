const db = require("../models");
const entity = "members";

const postMember = async (req, res, next) => {
    try {
        const { name } = req.body;
        let image = null;
        if (req.body && req.body.image) image = req.body.image;

        const createMember = await db[entity].create({
            name,
            image
        });
        res.send({
            title: "Members",
            message: "Miembro creado con exito!",
            newMember: createMember
        });
    } catch (err) {
        next(err);
    }
}

const membersController = {
    postMember
};
  
module.exports = membersController;