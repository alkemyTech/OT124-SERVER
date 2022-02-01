const db = require("../models");
const entity = "entries";

const updateNew = async function (req, res, next) {
  try {
    const { id } = req.params;
    const { name, content, image, categoryId, type } = req.body;
    const error = [];

    if (!name) {
      error.push({ text: "Agregar un nombre a la novedad" });
    }
    if (!content) {
      error.push({ text: "Agregar una breve descripcion a la novedad" });
    }
    if (!categoryId) {
      error.push({ text: "Agregar una id a la categoria" });
    }

    if (error.length > 0) {
      res.send({ title: "Novedades", messageErr: error });
    } else {
      const newUpdate = await db[entity].update(
        { name, content, image, categoryId, type },
        { where: { _id: id } }
      );
      if (newUpdate) {
        res.status(200).send({
          title: "Novedades",
          message: "Novedad actualizada",
          update: newUpdate,
        });
      } else {
        let err = new Error("New not found, New id invalid");
        err.name = "NotFoundError";
        throw err;
      }
    }
  } catch (err) {
    next(err);
  }
};

const deleteNew = async function (req, res, next) {
  try {
    const { id } = req.params;
    console.log(db[entity]);
    const deletedNew = await db[entity].destroy({ where: { id: id } });
    if (deletedNew) {
      return res.status(200).send({
        errors: null,
        msg: "New deleted",
      });
    }
    let err = new Error("New not found, New id invalid");
    err.name = "NotFoundError";
    throw err;
  } catch (err) {
    next(err);
  }
};

const getAllNews = async function (req, res, next) {
  try {
    const news = await db[entity].findAll({
      where: { type: "news" },
      attributes: ["id", "name", "image", "createdAt"],
      paranoid: false,
    });
    res.send({
      news,
    });
  } catch (err) {
    next(err);
  }
};

const getNewById = async function (req, res, next) {
  try {
    const { id } = req.params;
    const foundOne = await db[entity].findOne({ where: { _id: id } });
    res.status(200).send({ title: "Novedades", new: foundOne });
    let err = new Error("New not found, New id invalid");
    err.name = "NotFoundError";
    throw err;
  } catch (err) {
    next(err);
  }
};

const newsController = {
  deleteNew,
  updateNew,
  getAllNews,
  getNewById,
};

module.exports = newsController;
