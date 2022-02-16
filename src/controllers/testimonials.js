const entity = "testimonials";
const db = require("../models");
const { uploadFile } = require("../services/aws_s3");
const { parseS3Url } = require("../helpers/parseS3Url");

const getAllTestimonials = async function (req, res, next) {
  try {
    const testimonialsFound = await db[entity].findAll({
      order: [["createdAt", "DESC"]],
    });

    const testimonials = testimonialsFound.map((item) => {
      if (item.lastimage) {
        const parsedImage = parseS3Url(item.lastimage);
        item.lastimage = parsedImage;
      }
      return item;
    });

    res.send({
      testimonials,
    });

  } catch (err) {
    next(err);
  }
};

const getTestimonial = async function (req, res, next) {
  const { id } = req.params
  try {
    let testimonialFound = await db[entity].findByPk(id)
    
    if (!testimonialFound) {
      let err = new Error("Testimonial not found");
      err.name= 'NotFoundError'
      throw err;
    }

      if (testimonialFound.lastimage) {
        const parsedImage = parseS3Url(testimonialFound.lastimage);
        testimonialFound.lastimage = parsedImage;
      }

    return res.send({
      testimonial: testimonialFound
    })

  } catch (err) {
    next(err);
  }
};

const createTestimonial = async function (req, res, next) {
  try {
    let { name, content, image: lastimage } = req.body;
    if (req.file) {
      const { url } = await uploadFile(req.file, next);
      lastimage = url;
    }
    const testimonialCreated = await db[entity].create({
      name,
      content,
      lastimage,
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
      err.name= 'NotFoundError'
      throw err;
    }

    if (testimonialFound.lastimage) {
      const imageKey = await parseS3Url(testimonialFound.lastimage);
      //const deleted = await deleteFile(imageKey, next);
    }

    const testimonialDeleted = await testimonialFound.destroy();
    if (testimonialDeleted) {
      res.status(200).send({
        title: "Testimonials",
        message: "The Testimonial has been deleted successfully",
        testimonialDeleted
      });
    }
  } catch (err) {
    next(err);
  }
};

const updateTestimonial = async function (req, res, next) {
  try {
    const { id } = req.params;
    let { name, content, image: lastimage, key } = req.body;
    if (req.file) {
      if (key) {
        const { url } = await updateFile(req.file, key, next);
        lastimage = url;
      } else {
        const { url } = await uploadFile(req.file, next);
        lastimage = url;
      }
    } else {
      if (key) {
        // await deleteFile(key, next) //Access Denied
        // image = null
        const url = generateS3Url(key);
        lastimage = url;
      }
    }
    const testimonialUpdated = await db[entity].update(
      { name, content, lastimage },
      { where: { id: id } }
    );
    if (!testimonialUpdated) {
      let err = new Error("Testimonial not found");
      err.name = "NotFoundError";
      throw err;
    }
      return res.status(200).send({
        title: "Testimonials",
        message: "The Testimonial has been updated successfully",
        testimonialUpdated,
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
  getTestimonial
};


module.exports = testimonialsController;
