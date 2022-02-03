const db = require('../models')
entity = 'categories'

const updateCategory = async function (req, res, next) {
  try {
    const update = await db[entity].findAll({
      where: {
        id: { [Op.eq]: req.params.id },
      },
    });
    if (!update) {
      db[entity].update(
        {
          name: req.body.name,
          description: req.body.description,
        },
        {
          where: {
            id: req.params.id,
          }
        }
      );
      return res.json("Category created successfully");
    } else {
      return res.json("The category already exists");
    }
  } catch (err) {
    next(err);
  }
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

