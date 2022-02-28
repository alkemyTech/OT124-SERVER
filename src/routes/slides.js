const router = require('express').Router();
const slidesController = require('../controllers/slides');

// GET
router.get('/', slidesController.getSlides);

// PUT

module.exports = router;
