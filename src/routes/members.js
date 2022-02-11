var express = require("express");
const membersController = require("../controllers/members");
var router = express.Router();
const { validation } = require("../middlewares/validator");
const { memberPostSchema } = require("../validations/membersSchema");
const { validateToken } = require("../middlewares/auth");

/* GET all members */
router.get("/", membersController.getMembers);

/* POST new member */
router.post("/", validation(memberPostSchema), membersController.postMember);

router.delete("/:id", membersController.deleteMember);

router.put("/:id", validateToken, validation(memberPostSchema), membersController.updateMember );

module.exports = router;
