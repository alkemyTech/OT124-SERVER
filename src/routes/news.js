var express = require('express');
var router = express.Router();

const newsController = require('../controllers/news')

/* UPDATE new by ID. */
router.put('/:id', newsController.updateNew);
/* DELETE new by ID. */
router.delete('/:id', newsController.deleteNew);
/* GET new by ID */
router.get('/:id', newsController.getNewById );


module.exports = router;
