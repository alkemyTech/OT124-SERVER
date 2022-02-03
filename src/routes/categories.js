var express = require('express');
var router = express.Router();
const { createCategory, updateCategory } = require('../controllers/categories');
const { validateToken } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/isRole');
const { validation } = require('../middlewares/validator');
const {categoriesCreatorSchema} = require('../validations/categoriesSchema')

/* PUT categories. */
router.put('/:id', updateCategory)

router.post('/', validateToken, isAdmin, validation(categoriesCreatorSchema), createCategory)

module.exports = router;


