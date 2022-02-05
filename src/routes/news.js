var express = require("express");
var router = express.Router();
const newsController = require("../controllers/news");
const { validation } = require("../middlewares/validator");
const { newsCreatorSchema } = require("../validations/newsSchema");
const authController = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isRole");

/* UPDATE new by ID. */
router.put("/:id", validation(newsCreatorSchema), newsController.updateNew);
/* DELETE new by ID. */
router.delete("/:id", newsController.deleteNew);
/* GET new by ID */
router.get("/:id", newsController.getNewById);

router.get("/", newsController.getAllNews);

router.post(
  "/",
  validation(newsCreatorSchema),
  authController.validateToken,
  isAdmin,
  newsController.postNew
);

module.exports = router;
