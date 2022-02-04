const db = require("../models");
const entity = "members";
const getMembers = async function (req, res, next) {
  const resMembers = await db[entity].findAll();
  if (resMembers) {
    res.send(resMembers);
  } else {
    let err = new Error("problema al encontrar miembros");
    err.name = "NotFoundError";
    throw err;
  }
};

const postMember = async (req, res, next) => {
  try {
    const { name } = req.body;
    let image = null;
    if (req.body && req.body.image) image = req.body.image;

    const createMember = await db[entity].create({
      name,
      image,
    });
    res.send({
      title: "Members",
      message: "Miembro creado con exito!",
      newMember: createMember,
    });
  } catch (err) {
    next(err);
  }
};

const deleteMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteMember = await db[entity].destroy({
      where: {
        id,
      },
    });
    if (!deleteMember) {
      let err = new Error("Miembro no encontrado");
      err.name = "NotFoundError";
      throw err;
    }

    res.status(200).send({
      message: "Miembro eliminado con exito!",
    });
  } catch (err) {
    next(err);
  }
};

const membersController = {
  getMembers,
  postMember,
  deleteMember,
};

module.exports = membersController;
