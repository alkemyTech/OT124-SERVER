const db = require("../models");
const entity = "activities";
const { uploadFile, updateFile } = require("../services/aws_s3");

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
    if (req.file) {
      const { url } = await uploadFile(req.file, next);
      req.body.image = url;
    } else {
      req.body.image = null;
    }

    const newActivity = await db[entity].create(req.body);
    res.status(201).send({
      title: "Activities",
      message: "New activity created",
      newActivity: newActivity,
    });
  } catch (err) {
    next(err);
  }
};

const putActivities = async function (req, res, next) {
  const { id } = req.params;
  const { body } = req;

  try {
    // Find activity to update
    const activityFound = await db[entity].findOne({
      where: {
        id,
      },
    });

    // If not found, return
    if (!activityFound) {
      const error = new Error("Activity not found");
      throw error;
    }

    // If a file was sent
    if (req.file) {
      // If also a key was provided, update file with key and and update acivityFound url
      if (body.key) {
        const { url } = await updateFile(body.key, req.file, next);
        activityFound.image = url;
        // If the is no provided key, upload new file and update acivityFound url
      } else {
        const { url } = await uploadFile(req.file, next);
        activityFound.image = url;
      }
    }

    // If name was provided, update activityfound
    if (body.name) {
      activityFound.name = body.name;
    }
    // If content was provided, update activityFound
    if (body.content) {
      activityFound.content = body.content;
    }

    // Save new activityFound properties in db
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
