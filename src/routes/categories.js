var express = require('express');
var router = express.Router();
const { Op } = require("sequelize");


/* PUT categories. */
router.put('/categories/:id', function(req, res, next) {
    db.Categories.findAll({
        where: {
          id: { [Op.like]: req.params.id },
        },q
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

module.exports = router;
//put

