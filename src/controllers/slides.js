const db = require("../models");
const entity = "slides";
const { parseS3Url } = require("../helpers/parseS3Url");
const { uploadFile, updateFile } = require("../services/aws_s3");
const { calculatePagination } = require("../helpers/calculatePagination");
const { generateSearch } = require("../helpers/generateSearch");

const getSlides = async (req, res, next) => {
  const { size, page, search } = req.query;
  try {
    const { limit, offset } = calculatePagination(size, page);

    const searchQuery = generateSearch(entity, search);

    const slidesFound = await db[entity].findAndCountAll({
      limit,
      offset,
      ...searchQuery,
      order: [["order", "ASC"]],
    });
    let err;

    if (!slidesFound) {
      err = new Error("Slides not found");
      err.name = "NotFoundError";
      throw err;
    }

    const slides = slidesFound?.rows?.map((item) => {
      if (item.image) {
        const parsedImage = parseS3Url(item.image);
        item.image = parsedImage;
      }
      return item;
    });

    res.send({
      slides,
      count: slidesFound.count
    });
  } catch (err) {
    next(err);
  }
};

const updateSlides = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const slideFound = await db[entity].findOne({
      where: { id },
    });

    if (!slideFound) {
      const error = new Error("Slide not found");
      error.name = "NotFoundError";
      throw error;
    }

    if (req.file) {
      // If also a key was provided, update file with key and and update testimonialFound url
      if (body.key) {
        const { url } = await updateFile(body.key, req.file, next);
        slideFound.image = url;
        // If the is no provided key, upload new file and update testimonialFound url
      } else {
        const { url } = await uploadFile(req.file, next);
        slideFound.image = url;
      }
    }

    // If name was provided, update testimonialfound
    if (body.text) {
      slideFound.name = body.name;
    }
    // If content was provided, update testimonialFound
    if (body.order) {
      slideFound.order = body.order;
    }

    await slideFound.save();

    return res.status(200).json({
      title: "Slides",
      message: "The slide has been updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const getSlideById = async function (req, res, next) {
    const { id } = req.params;
    console.log("here")
    try {
      let slideFound = await db[entity].findByPk(id);
  
      if (!slideFound) {
        let err = new Error("Slide not found");
        err.name = "NotFoundError";
        throw err;
      }
  
      if (slideFound.image) {
        const parsedImage = parseS3Url(slideFound.image);
        slideFound.image = parsedImage;
      }
  
      return res.send({
        slide: slideFound,
      });
    } catch (err) {
      next(err);
    }
  };

  const createSlide = async function (req, res, next) {
    try {
      let { text, order, image } = req.body;
      if (req.file) {
        const { url } = await uploadFile(req.file, next);
        image = url;
      }
      const slideCreated = await db[entity].create({
        text,
        order,
        image,
      });

      return res.status(201).send({
        title: "Slides",
        message: "The Slide has been created successfully",
        slideCreated,
      });
    } catch (err) {
      next(err);
    }
  };

  const deleteSlide = async function (req, res, next) {
    try {
      const { id } = req.params;
  
      const slideFound = await db[entity].findByPk(id);
  
      if (!slideFound) {
        let err = new Error("Slide not found");
        err.name = "NotFoundError";
        throw err;
      }
  
      if (slideFound.image) {
        const imageKey = await parseS3Url(slideFound.image);
        //const deleted = await deleteFile(imageKey, next);
      }
  
      const slideDeleted = await slideFound.destroy();
      if (slideDeleted) {
        res.status(200).send({
          title: "Slides",
          message: "The Slide has been deleted successfully",
          slideDeleted,
        });
      }
    } catch (err) {
      next(err);
    }
  }

const slidesController = {
  getSlides,
  updateSlides,
  deleteSlide,
  createSlide,
  getSlideById
};

module.exports = slidesController;
