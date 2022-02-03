var express = require('express');
var router = express.Router();
const categoriesController = require("../controllers/categories");

router.put('/:id', categoriesController.putCategories );
router.delete('/:id', categoriesController.deleteCategorie );

module.exports = router;


