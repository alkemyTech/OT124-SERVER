var express = require("express");
const membersController = require("../controllers/members");
var router = express.Router();
const { validation } = require("../middlewares/validator");
const { memberPostSchema } = require("../validations/membersSchema");

/* GET all members */
router.get("/", membersController.getMembers);

/* POST new member */
router.post("/", validation(memberPostSchema), membersController.postMember);

router.delete("/:id", membersController.deleteMember);

module.exports = router;
