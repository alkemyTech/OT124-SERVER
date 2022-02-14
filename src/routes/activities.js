var express = require("express");
var router = express.Router();
const { isAdmin } = require("../middlewares/isRole");
const { validateToken } = require("../middlewares/auth");
const activityController = require("../controllers/activities");
const {
  putActivitiesSchema,
  putFileSchema,
  fileSchema,
  activitiesSchema,
} = require("../validations/activitiesSchema");
const { validation, fileValidation } = require("../middlewares/validator");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", validateToken, isAdmin, activityController.getActivities);

router.post(
  "/",
  validateToken,
  isAdmin,
  upload.single("image"),
  fileValidation(fileSchema),
  validation(activitiesSchema),
  activityController.postActivities
);

router.put(
  "/:id",
  validateToken,
  isAdmin,
  upload.single("image"),
  fileValidation(putFileSchema),
  validation(putActivitiesSchema),
  activityController.putActivities
);
router.get("/:id", validateToken, isAdmin, activityController.getActivityById);
router.delete(
  "/:id",
  validateToken,
  isAdmin,
  activityController.deleteActivityById
);

module.exports = router;
