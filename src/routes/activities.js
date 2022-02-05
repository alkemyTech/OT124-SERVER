var express = require("express");
var router = express.Router();
const { isAdmin } = require("../middlewares/isRole");
const activityController = require("../controllers/activities");
const { putActivitiesSchema } = require("../validations/activitiesSchema");
const { validation } = require("../middlewares/validator");

router.get("/", activityController.getActivities);
router.post("/", activityController.postActivities);
router.put(
  "/:id",
  validation(putActivitiesSchema),
  isAdmin,
  activityController.putActivities
);

module.exports = router;
