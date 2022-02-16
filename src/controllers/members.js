const db = require("../models");
const entity = "members";

const getAllMembers = async function (req, res, next) {
  try {
    const membersFound = await db[entity].findAll({
      where: { type: "members" },
      attributes: ["id", "name", "image", "createdAt"],
      order: [["createdAt", "DESC"]],
    });

    const allMembers = membersFound.map((item) => {
      if (item.image) {
        const parsedImage = parseS3Url(item.image);
        item.image = parsedImage;
      }
      return item;
    });

    res.send({
      title: "Members",
      Members: allMembers,
    });
  } catch (err) {
    next(err);
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

const updateMember = async function (req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;

    const memberFound = await db[entity].findOne({
      where: {
        id,
      },
    });

    if (!memberFound) {
      const error = new Error("Activity not found");
      throw error;
    }

    if (req.file) {
      if (body.key) {
        const { url } = await updateFile(body.key, req.file, next);
        memberFound.image = url;
      } else {
        const { url } = await uploadFile(req.file, next);
        memberFound.image = url;
      }
    }

    if (body.name) {
      memberFound.name = body.name;
    }

    // Save new memberFound properties in db
    await memberFound.save();

    return res.status(200).json({
      msg: "Member succesfully updated",
    });
  } catch (err) {
    next(err);
  }
};

const membersController = {
  getAllMembers,
  postMember,
  deleteMember,
  updateMember,
};

module.exports = membersController;
