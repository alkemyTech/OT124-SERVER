var express = require("express");
var router = express.Router();
const categoriesController = require("../controllers/categories");
const { validateToken } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isRole");
const { validation } = require("../middlewares/validator");
const { categoriesCreatorSchema } = require("../validations/categoriesSchema");

router.post(  "/",  validateToken,  isAdmin,  validation(categoriesCreatorSchema), categoriesController.createCategory);
router.get("/", validateToken, isAdmin, categoriesController.getAllCategories);
router.put("/:id", categoriesController.putCategories);
router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;
