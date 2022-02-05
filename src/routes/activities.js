var express = require("express");
var router = express.Router();
const { isAdmin } = require("../middlewares/isRole");
const activityController = require("../controllers/activities");
const {
  putActivitiesSchema,
  fileSchema,
} = require("../validations/activitiesSchema");
const { validation, fileValidation } = require("../middlewares/validator");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", activityController.getActivities);
router.post("/", activityController.postActivities);
router.put(
  "/:id",
  upload.single("image"),
  fileValidation(fileSchema),
  validation(putActivitiesSchema),
  isAdmin,
  activityController.putActivities
);

module.exports = router;
