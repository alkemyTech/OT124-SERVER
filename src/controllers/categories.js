const db = require('../models')
const entity = 'categories'

const putCategories = async function(req, res, next) {

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
}


const categoriesController = {
    putCategories
    
};

module.exports = categoriesController;