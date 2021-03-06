const express = require("express");
const router = express.Router();
const slidesController = require("../controllers/slides");
const { isAdmin } = require("../middlewares/isRole");
const { validation, fileValidation } = require("../middlewares/validator");
const authController = require("../middlewares/auth");
const { fileSchema } = require("../validations/fileSchema");
const { updateSlideSchema } = require("../validations/slidesSchema");

const multer = require("multer");
const upload = multer();

// GET
router.get("/", slidesController.getSlides);

// GET BY ID
router.get("/:id", slidesController.getSlideById);

// DELETE
router.delete(
  "/:id",
  authController.validateToken,
  isAdmin,
  slidesController.deleteSlide
);

//POST
router.post(
  "/",
  authController.validateToken,
  isAdmin,
  upload.single("image"),
  validation(updateSlideSchema),
  fileValidation(fileSchema),
  slidesController.createSlide
);

// PUT
router.put(
  "/:id",
  authController.validateToken,
  isAdmin,
  upload.single("image"),
  validation(updateSlideSchema),
  fileValidation(fileSchema),
  slidesController.updateSlides
);

module.exports = router;
