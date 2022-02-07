const db = require("../models");
entity = "categories";

const putCategories = async function (req, res, next) {
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
          },
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

const getAllCategories = async (req, res, next) => {
  try {
    const allCategories = await db[entity].findAll();
    return res.status(201).send({
      allCategories: allCategories.name,
    });
  } catch (err) {
    next(err);
  }
};

const createCategory = async function (req, res, next) {
  try {
    const categoryCreated = await db[entity].create(req.body);
    res.status(201).send({
      title: "Categories",
      message: "The Category has been created sucessfully",
      newCategory: categoryCreated,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async function (req, res, next) {
  try {
    const findCat = await db[entity].findOne({
      where: {
        id: { [Op.eq]: req.params.id },
      },
    });
    if (!findCat) {
      return res.json("La categoria no existe");
    } else {
      await db[entity].destroy({
        where: {
          id: { [Op.eq]: req.query.id },
        },
      });

      return res.json("La categoria a sido borrada");
    }
  } catch (err) {
    next(err);
  }
};

const categoriesController = {
  putCategories,
  deleteCategory,
  createCategory,
  getAllCategories,
};

module.exports = categoriesController;
