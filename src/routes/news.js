var express = require('express');
var router = express.Router();
const newsController = require('../controllers/news')
const {validation} = require('../middlewares/validator')
const {newsCreatorSchema} = require('../validations/newsSchema')


/* UPDATE new by ID. */
router.put('/:id', validation(newsCreatorSchema), newsController.updateNew);
/* DELETE new by ID. */
router.delete('/:id', newsController.deleteNew);
/* GET new by ID */
router.get('/:id', newsController.getNewById );


module.exports = router;
