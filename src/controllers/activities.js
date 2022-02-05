const db = require("../models");
const entity = "activities";
const { updateFileByKey, createFile } = require("./files");

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
    const { name, content } = req.body;
    const createdFile = await createFile(req, res, next);

    const newActivity = await db[entity].create({
      name,
      content,
      image: createdFile.key,
    });
    res.send({
      title: "Activities",
      message: "Actividad creada con exito!",
      newActivity: newActivity,
    });
  } catch (err) {
    next(err);
  }
};

const putActivities = async function (req, res, next) {
  const { id } = req.params;
  const body = req.body;

  try {
    const activityFound = await db[entity].findOne({
      where: {
        id,
      },
    });

    if (!activityFound) {
      const error = new Error();
      throw error;
    }

    if (body.name) {
      activityFound.name = body.name;
    }
    if (req.file) {
      await updateFileByKey(req, activityFound, next);
    }
    if (body.content) {
      activityFound.content = body.content;
    }

    await activityFound.save();

    return res.status(200).json({
      msg: "Activity succesfully updated",
    });
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
