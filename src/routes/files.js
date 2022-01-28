var express = require('express');
const { getFileByKey } = require('../controllers/files');
var router = express.Router();


router.get('/:key', getFileByKey);

module.exports = router;
