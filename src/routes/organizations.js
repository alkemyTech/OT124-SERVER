var express = require('express');
var router = express.Router();
const authController = require("../middlewares/auth");
const multer = require("multer");
const upload = multer();
const { isAdmin } = require("../middlewares/isRole");
const organizationsController = require('../controllers/organizations');
const { validation, fileValidation } = require("../middlewares/validator");
const { fileSchema } = require("../validations/fileSchema");
const { organizationPostSchema, organizationPutSchema } = require('../validations/organizationSchema');
/* GET organization by ID. */
router.get('/:id/public', organizationsController.getOrganization);
/*GET all organizations */
router.get('/',
 organizationsController.getOrganizations);

/* POST create organization */ 
router.post(
    "/",
    authController.validateToken,
    isAdmin,
    upload.single("image"),
    validation(organizationPostSchema),
    fileValidation(fileSchema),
    organizationsController.createOrganization
  );
/* PUT edit organization route */
router.put(
    "/:id",
    authController.validateToken,
    isAdmin,
    upload.single("image"),
    validation(organizationPostSchema),
    fileValidation(fileSchema),
    organizationsController.editOrganization
  );
/* PUT edit organization route */
router.delete(
    "/:id",
    authController.validateToken,
    isAdmin,
    organizationsController.deleteOrganization
  )

module.exports = router;
