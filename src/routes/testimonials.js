var express = require('express');
var router = express.Router();

const multer  = require('multer')
const upload = multer()

const testimonialsController = require('../controllers/testimonials')
const {validation} = require('../middlewares/validator')
const {testimonialsCreatorSchema} = require('../validations/testimonialSchema')

/* POST testimonials content. */
router.post('/', upload.single('avatar'), validation(testimonialsCreatorSchema) ,testimonialsController.createTestimonial );

module.exports = router;