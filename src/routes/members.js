var express = require("express");
const { isAdmin } = require("../middlewares/isRole");
const membersController = require("../controllers/members");
var router = express.Router();
const { validation, fileValidation } = require("../middlewares/validator");
const { memberPostSchema } = require("../validations/membersSchema");
const { validateToken } = require("../middlewares/auth");
const { fileSchema } = require("../validations/fileSchema");

const multer = require("multer");
const upload = multer();


/* GET all members */
router.get("/", membersController.getAllMembers);

/* POST new member */
router.post("/", validateToken, isAdmin, upload.single("image"), validation(memberPostSchema), fileValidation(fileSchema), membersController.postMember);



router.delete("/:id", validateToken, isAdmin, membersController.deleteMember);

/* GET  member by id*/
router.get("/:id", membersController.getMemberById);

router.put(
  "/:id",
  validateToken,
  isAdmin,
  upload.single("image"),
  validation(memberPostSchema),
  fileValidation(fileSchema),
  membersController.updateMember
);

module.exports = router;
