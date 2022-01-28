
var router = express.Router();


const db = require('../models');


//delete a 'contact' or user
//,validation(userDeleteSchema)
router.get('/', async (req, res, next) => {

    await db['entries'].findAll()


});

module.exports = router;