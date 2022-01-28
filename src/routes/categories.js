var express = require('express');
var router = express.Router();
const categoriesController = require("../controllers/categories");

router.put('/:id', categoriesController.putCategories );

module.exports = router;


