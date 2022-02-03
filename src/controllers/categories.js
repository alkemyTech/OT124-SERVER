const db = require('../models')
entity = 'categories'

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
      createCategory
  }
  module.exports = categoriesController;