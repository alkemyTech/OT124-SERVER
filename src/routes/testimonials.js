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

/* GET all testimonials route. */
router.get("/", testimonialsController.getAllTestimonials);

router.get("/:id", testimonialsController.getTestimonial);

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

/* DELETE testimonials content. */
router.delete(
    "/:id",
    authController.validateToken,
    isAdmin,
    testimonialsController.deleteTestimonialById
  );

module.exports = router;
