var express = require("express");
var router = express.Router();
const activityController = require("../controllers/activities");

router.get("/", activityController.getActivities);
router.post("/", activityController.postActivities);

module.exports = router;
