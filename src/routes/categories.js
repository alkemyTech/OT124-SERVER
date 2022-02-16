var express = require('express');
var router = express.Router();
const categoriesController = require('../controllers/categories');
const { validateToken } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/isRole');
const { validation } = require('../middlewares/validator');
const {categoriesCreatorSchema} = require('../validations/categoriesSchema')

router.get("/", categoriesController.getAllCategories);
router.get("/:id", categoriesController.getCategoryById);
router.post('/', validateToken, isAdmin, validation(categoriesCreatorSchema), categoriesController.createCategory)
/* PUT categories. */
router.put(
  "/:id",
  validateToken,
  isAdmin,
  validation(categoriesCreatorSchema),
  categoriesController.putCategories
);
router.delete(
  "/:id",
  validateToken,
  isAdmin,
  categoriesController.deleteCategory
);

module.exports = router;


