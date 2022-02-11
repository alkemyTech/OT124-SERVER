var express = require("express");
var router = express.Router();
const { validateToken } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isRole");

const multer = require("multer");
const upload = multer();

const testimonialsController = require("../controllers/testimonials");
const { validation } = require("../middlewares/validator");
const {
  testimonialsCreatorSchema,
} = require("../validations/testimonialSchema");

/* POST testimonials content. */
router.post(
  "/",
  validateToken,
  isAdmin,
  upload.single("avatar"),
  validation(testimonialsCreatorSchema),
  testimonialsController.createTestimonial
);

/* DELETE testimonials content. */
router.delete(
  "/:id",
  validateToken,
  isAdmin,
  testimonialsController.deleteTestimonialById
);

module.exports = router;
