var express = require("express");
const { isAdmin } = require("../middlewares/isRole");
const membersController = require("../controllers/members");
var router = express.Router();
const { validation } = require("../middlewares/validator");
const { memberPostSchema } = require("../validations/membersSchema");
const { validateToken } = require("../middlewares/auth");

/* GET all members */
router.get("/", membersController.getAllMembers);

/* POST new member */
router.post("/", validateToken, isAdmin, validation(memberPostSchema), membersController.postMember);

router.delete("/:id", validateToken, isAdmin, membersController.deleteMember);

/* GET  member by id*/
router.get("/:id", validateToken, membersController.getMemberById);

router.put(
  "/:id",
  validateToken,
  validation(memberPostSchema),
  membersController.updateMember
);

module.exports = router;
