const db = require("../models");
const entity = "activities";
const updateFile = require("../services/aws_s3");

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
  const { name, content } = req.body;

  try {
    const activityFound = await db[entity].findOne({
      where: {
        id,
      },
    });

    if (name) {
      activityFound.name = name;
    }
    if (req.file) {
      await updateFile(img, req.file, next);
    }
    if (content) {
      activityFound.content = content;
    }

    await activityFound.save();

    return res.json("Actividad actualizada");
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
