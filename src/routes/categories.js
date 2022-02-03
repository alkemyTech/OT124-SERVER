var express = require('express');
var router = express.Router();
const { Op } = require("sequelize");
const { createCategory } = require('../controllers/categories');
const { validateToken } = require('../middlewares/auth');
const { isAdmin, isDev } = require('../middlewares/isRole');
const { validation } = require('../middlewares/validator');
const {categoriesCreatorSchema} = require('../validations/categoriesSchema')

/* PUT categories. */
router.put('/categories/:id', function(req, res, next) {
    db.Categories.findAll({
        where: {
          id: { [Op.like]: req.params.id },
        },
      }).then(function (categories) {
        if (!categories) {
            db.Categories.update({
                name: req.body.name,
                description: req.body.description                
              });      
              return res.json("Category created successfully");
          
        } else {       
            return res.json("The category already exists");
        }
      });

});

router.post('/', validateToken, isAdmin, validation(categoriesCreatorSchema), createCategory)

module.exports = router;
//put

