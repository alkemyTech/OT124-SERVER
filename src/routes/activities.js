var express = require('express');
const activityController = require('../controllers/activities')


router.get('/', activityController.getActivities)
router.post('/', activityController.postActivities)

module.exports = router;
