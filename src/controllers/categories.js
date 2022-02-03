const db = require("../models");
const entity = "categories";

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

const deleteCategorie = async function (req, res, next) {
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
  deleteCategorie,
};

module.exports = categoriesController;
