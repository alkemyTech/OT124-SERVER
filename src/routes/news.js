var express = require("express");
var router = express.Router();
const newsController = require("../controllers/news");
const { validation } = require("../middlewares/validator");
const { newsCreatorSchema, fileSchema } = require("../validations/newsSchema");
const authController = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isRole");

const multer = require("multer");
const upload = multer();

/* UPDATE new by ID. */
router.put("/:id", validation(newsCreatorSchema), newsController.updateNew);
/* DELETE new by ID. */
router.delete("/:id", newsController.deleteNew);
/* GET new by ID */
router.get("/:id", newsController.getNewById);

router.get("/", newsController.getAllNews);

router.post(
  "/",
  authController.validateToken,
  isAdmin,
  upload.single("image"),
  validation(fileSchema),
  validation(newsCreatorSchema),
  newsController.postNew
);

module.exports = router;
