const router = require("express").Router();
const { validation } = require('../middlewares/validator');
const { memberPostSchema } = require('../validations/membersSchema');
const membersController = require('../controllers/members');


/* POST new member */
router.post('/', validation(memberPostSchema), membersController.postMember);

module.exports = router;
