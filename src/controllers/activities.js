const { where } = require("sequelize/dist");
const db = require("../models");
const { options } = require("../routes/news");
const entity = "activities";

const getActivities = async function (req, res, next) {
  try {
    const listActivity = await db[entity].findAll();
    res.send({ title: "Activities", listActivity });
  } catch (err) {
    next(err);
  }
};

const postActivities = async function (req, res, next) {
  try {
    const { name, img, content } = req.body;
    const error = [];

    if (!name) {
      error.push({ text: "Agregar el nombre de la actividad" });
    }
    if (!content) {
      error.push({ text: "Agregar una breve descripcion de la actividad" });
    }
    if (error.length > 0) {
      return res.send({ title: "Activities", message: error });
    } else {
      const newActivity = await db[entity].create({ name, content, img });
      res.send({
        title: "Activities",
        message: "Actividad creada con exito!",
        newActivity: newActivity,
      });
    }
  } catch (err) {
    next(err);
  }
};

const putActivities = async function (req, res, next) {
  const { id } = req.params;
  const { name, img, content } = req.body;

  try {
    const activityFound = await db[entity].findOne({
      where: {
        id: id,
      },
    });

    if (name) {
      activityFound.name = name;
    }
    if (img) {
      activityFound.img = img;
    }
    if (content) {
      activityFound.content = content;
    }

    const response = await activityFound.save();

    res.send({ response });
  } catch (err) {
    next(err);
  }
};

const activityController = {
  getActivities,
  postActivities,
  putActivities,
};

module.exports = activityController;
