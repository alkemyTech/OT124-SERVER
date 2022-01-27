var express = require('express');
var router = express.Router();
const testimonialsController = require('../controllers/testimonials')
const {validation} = require('../middlewares/validator')
const {testimonialsCreatorSchema} = require('../validations/testimonialSchema')

/* POST testimonials content. */
router.post('/', validation(testimonialsCreatorSchema) ,testimonialsController.createTestimonial );

module.exports = router;