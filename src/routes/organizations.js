var express = require('express');
var router = express.Router();

const organizationsController = require('../controllers/organizations');

/* GET organization by ID. */
router.get('/:id/public', organizationsController.getOrganization);


module.exports = router;
