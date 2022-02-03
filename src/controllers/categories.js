const db = require('../models')
entity = 'categories'

const updateCategory = async function(req, res, next) {
  db[entity].findAll({
      where: {
        id: { [Op.like]: req.params.id },
      },
    }).then(function (categories) {
      if (!categories) {
          db[entity].update({
              name: req.body.name,
              description: req.body.description                
            });      
            return res.json("Category created successfully");
      } else {       
          return res.json("The category already exists");
      }
    });
};

const createCategory = async function (req, res, next) {
    try {
      const categoryCreated = await db[entity].create(req.body)
      res.status(201).send({
          title: 'Categories',
          message: 'The Category has been created sucessfully',
          newCategory: categoryCreated
      })
    } catch (err) {
      next(err);
    }
  };
  const categoriesController = {
      createCategory,
      updateCategory
  }
  module.exports = categoriesController;