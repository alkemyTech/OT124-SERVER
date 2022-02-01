var express = require('express');
const membersController = require('../controllers/members');
var router = express.Router();



router.get('/', membersController.getMembers)



module.exports = router;