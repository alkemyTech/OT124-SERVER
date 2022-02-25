const { generateS3Url } = require("../helpers/generateS3url");
const { parseS3Url } = require("../helpers/parseS3Url");
const db = require("../models");
const { updateFile, uploadFile, deleteFile } = require("../services/aws_s3");
const entity = "entries";

const postNew = async function (req, res, next) {
  try {
    if (req.file) {
      const { url } = await uploadFile(req.file, next);
      req.body.image = url;
    } else {
      req.body.image = null;
    }

    const newCreated = await db[entity].create(req.body);
    return res.status(201).send({
      title: "News",
      message: "The New has been created successfully",
      newCreated: newCreated,
    });
  } catch (err) {
    next(err);
  }
};

const updateNew = async function (req, res, next) {
  try {
    const { id } = req.params;
    let { name, content, image, key, categoryId, type} = req.body;
    if (req.file){
        if (key){
          const {url} = await updateFile(req.file, key, next)
          image = url
        }
        else{
          const {url} = await uploadFile(req.file, next)
          image = url
        } 
    }
    else{
      if (key){
        // await deleteFile(key, next) //Access Denied
        // image = null
        const url = generateS3Url(key)
        image = url
      }
    }
      const newUpdate = await db[entity].update(
        { name, content, image, categoryId, type },
        { where: { id: id } }
      ); 
      if (newUpdate) {
        return res.status(200).send({
          title: "News",
          message: "The New has been updated successfully",
          update: newUpdate,
        });
      } else {
        let err = new Error("New not found, New id invalid");
        err.name = "NotFoundError";
        throw err;
      }
  } catch (err) {
    next(err);
  }
};

const deleteNew = async function (req, res, next) {
  try {
    const { id } = req.params;
    const deletedNew = await db[entity].destroy({ where: { id: id } });
    if (deletedNew) {
      return res.status(200).send({
        errors: null,
        msg: "New deleted",
      });
    }
    let err = new Error("New not found");
    err.name = "NotFoundError";
    throw err;
  } catch (err) {
    next(err);
  }
};

const getAllNews = async function (req, res, next) {
  try {
    const newsFound = await db[entity].findAll({
      order: [["createdAt", "DESC"]],
    });

    const news = newsFound.map((item) => {
      if (item.image) {
        const parsedImage = parseS3Url(item.image);
        item.image = parsedImage;
      }
      return item;
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
    let foundOne = await db[entity].findOne({ where: { id: id } });
      if (foundOne){
      const parsedURL = parseS3Url(foundOne.image)
      foundOne.image = parsedURL
        
      return res.status(200).send({ title: "Novedades", new: foundOne });
     }
    let err = new Error("New not found");
    err.name = "NotFoundError";
    throw err;
  } 
  catch (err) {
    next(err);
  }
};

const newsController = {
  deleteNew,
  updateNew,
  getAllNews,
  getNewById,
  postNew,
};

module.exports = newsController;
