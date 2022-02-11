var express = require("express");
var router = express.Router();

const multer = require("multer");
const upload = multer();

const testimonialsController = require("../controllers/testimonials");
const authController = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isRole");
const { validation, fileValidation } = require("../middlewares/validator");
const { fileSchema } = require("../validations/fileSchema");
const {
  testimonialsCreatorSchema,
} = require("../validations/testimonialSchema");

/* POST testimonials route. */
router.post(
  "/",
  authController.validateToken,
  isAdmin,
  upload.single("image"),
  validation(testimonialsCreatorSchema),
  fileValidation(fileSchema),
  testimonialsController.createTestimonial
);
/* PUT testimonials route. */
router.put(
  "/:id",
  authController.validateToken,
  isAdmin,
  upload.single("image"),
  validation(testimonialsCreatorSchema),
  fileValidation(fileSchema),
  testimonialsController.updateTestimonial
);

module.exports = router;
