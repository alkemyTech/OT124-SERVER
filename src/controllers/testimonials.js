const entity = "testimonials";
const db = require("../models");
const { uploadFile, deleteFile } = require("../services/aws_s3");
const { parseS3Url } = require("../helpers/parseS3Url");

const createTestimonial = async function (req, res, next) {
  try {
    if (req.file) {
      const { url } = await uploadFile(req.file, next);
      req.body.lastimage = url;
    }
    const testimonialCreated = await db[entity].create(req.body);
    return res.status(201).send({
      title: "Testimonials",
      message: "The Testimonial has been created successfully",
      newTestimonial: testimonialCreated,
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
      const err = new Error("Testimonial not found");
      throw err;
    }

    if (testimonialFound.lastimage) {
      console.log(testimonialFound.lastimage);
      const imageKey = await parseS3Url(testimonialFound.lastimage);
      console.log(imageKey);
      const deleted = await deleteFile(imageKey, next);
      console.log(deleted);
    }
    const testimonialDeleted = await testimonialFound.destroy();
    if (testimonialDeleted) {
      res.status(200).send({
        title: "Testimonials",
        message: "The Testimonial has been deleted successfully",
      });
    }
  } catch (err) {
    next(err);
  }
};

const testimonialsController = {
  createTestimonial,
  deleteTestimonialById,
};
module.exports = testimonialsController;
