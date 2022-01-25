var express = require('express');
var router = express.Router();
const { Op } = require("sequelize");


/* PUT categories. */
router.PUT('/categories/:id', function(req, res, next) {
    db.Categories.findAll({
        where: {
          id: { [Op.eq]: req.params.id },
        },q
      }).then(function (categories) {
        if (!categories) {
            db.Categories.update({
                name: req.body.name,
                description: req.body.description                
              }, {
                where: {
                    id: req.params.id
                }
            });      
              return res.json("Category created successfully");
          
        } else {       
            return res.json("The category already exists");
        }
      });

});

module.exports = router;
//put

