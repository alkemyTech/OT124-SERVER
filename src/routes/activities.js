var express = require("express");
var router = express.Router();
const { isAdmin } = require("../middlewares/isRole");
const activityController = require("../controllers/activities");
const { putActivitiesSchema } = require("../validations/activitiesSchema");

router.get("/", activityController.getActivities);
router.post("/", activityController.postActivities);
router.put(
  "/:id",
  putActivitiesSchema,
  isAdmin,
  activityController.putActivities
);

module.exports = router;
