var express = require('express');
var router = express.Router();
const entriesController = require('../controllers/entries')
const {validation} = require('../middlewares/validator')
const {entriesCreatorSchema} = require('../validations/entriesSchema')

/* UPDATE new by ID. */
router.put('/:id', validation(entriesCreatorSchema), entriesController.updateEntry);
/* DELETE new by ID. */
router.delete('/:id', entriesController.deleteEntry);
/* GET new by ID */
router.get('/:id', entriesController.getEntryById );


module.exports = router;
