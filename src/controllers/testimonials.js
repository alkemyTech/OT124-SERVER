const entity = "testimonials";
const db = require("../models");
const { uploadFile, updateFile } = require("../services/aws_s3");
const { parseS3Url } = require("../helpers/parseS3Url");
const { calculatePagination } = require("../helpers/calculatePagination");
const { generateSearch } = require("../helpers/generateSearch");

const getAllTestimonials = async function (req, res, next) {
  const { size, page, search } = req.query;
  try {
    const { limit, offset } = calculatePagination(size, page);

    const searchQuery = generateSearch(entity, search);

    const testimonialsFound = await db[entity].findAndCountAll({
      limit,
      offset: search ? null : offset,
      ...searchQuery,
      order: [["createdAt", "DESC"]],
    });

    const testimonials = testimonialsFound?.rows?.map((item) => {
      if (item.image) {
        const parsedImage = parseS3Url(item.image);
        item.image = parsedImage;
      }
      return item;
    });

    res.send({
      testimonials,
      count: testimonialsFound?.count,
    });
  } catch (err) {
    next(err);
  }
};

const getTestimonial = async function (req, res, next) {
  const { id } = req.params;
  try {
    let testimonialFound = await db[entity].findByPk(id);

    if (!testimonialFound) {
      let err = new Error("Testimonial not found");
      err.name = "NotFoundError";
      throw err;
    }

    if (testimonialFound.image) {
      const parsedImage = parseS3Url(testimonialFound.image);
      testimonialFound.image = parsedImage;
    }

    return res.send({
      testimonial: testimonialFound,
    });
  } catch (err) {
    next(err);
  }
};

const createTestimonial = async function (req, res, next) {
  try {
    let { name, content, image: image } = req.body;
    if (req.file) {
      const { url } = await uploadFile(req.file, next);
      image = url;
    }
    const testimonialCreated = await db[entity].create({
      name,
      content,
      image,
    });

    return res.status(201).send({
      title: "Testimonials",
      message: "The Testimonial has been created successfully",
      testimonialCreated,
    });
  } catch (err) {
    next(err);
  }
};

const deleteTestimonialById = async function (req, res, next) {
  try {
    const { id } = req.params;

    const testimonialFound = await db[entity].findByPk(id);

    if (!testimonialFound) {
      let err = new Error("Testimonial not found");
      err.name = "NotFoundError";
      throw err;
    }

    if (testimonialFound.image) {
      const imageKey = await parseS3Url(testimonialFound.image);
      //const deleted = await deleteFile(imageKey, next);
    }

    const testimonialDeleted = await testimonialFound.destroy();
    if (testimonialDeleted) {
      res.status(200).send({
        title: "Testimonials",
        message: "The Testimonial has been deleted successfully",
        testimonialDeleted,
      });
    }
  } catch (err) {
    next(err);
  }
};

const updateTestimonial = async function (req, res, next) {
  const { id } = req.params;
  const { body } = req;

  try {
    // Find tetimonial to update
    const testimonialFound = await db[entity].findOne({
      where: {
        id,
      },
    });

    // If not found, return
    if (!testimonialFound) {
      const error = new Error("Tetimonial not found");
      error.name = "NotFoundError";
      throw error;
    }

    // If a file was sent
    if (req.file) {
      // If also a key was provided, update file with key and and update testimonialFound url
      if (body.key) {
        const { url } = await updateFile(body.key, req.file, next);
        testimonialFound.image = url;
        // If the is no provided key, upload new file and update testimonialFound url
      } else {
        const { url } = await uploadFile(req.file, next);
        testimonialFound.image = url;
      }
    }

    // If name was provided, update testimonialfound
    if (body.name) {
      testimonialFound.name = body.name;
    }
    // If content was provided, update testimonialFound
    if (body.content) {
      testimonialFound.content = body.content;
    }

    // Save new testimonialFound properties in db
    await testimonialFound.save();

    return res.status(200).json({
      title: "Testimonials",
      message: "The testimonial has been updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const testimonialsController = {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonialById,
  getTestimonial,
};

module.exports = testimonialsController;
