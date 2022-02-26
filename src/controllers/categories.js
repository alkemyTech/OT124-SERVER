const { calculatePagination } = require("../helpers/calculatePagination");
const { generateSearch } = require("../helpers/generateSearch");
const db = require("../models");


entity = "categories";

const getAllCategories = async function (req, res, next) {
  const { size, page, search } = req.query;
  try {
    const { limit, offset } = calculatePagination(size, page);

    const searchQuery = generateSearch(entity, search)

    const categoriesFound = await db[entity].findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit,
      offset: search ? null : offset,
      ...searchQuery
    });
    res.send({
      title: "Categories",
      categories: categoriesFound?.rows,
      count: categoriesFound?.count,
    });
  } catch (err) {
    next(err);
  }
};

const getCategoryById = async function (req, res, next) {
  try {
    const { id } = req.params;
    const categoryFound = await db[entity].findByPk(id);

    if (!categoryFound) {
      const err = new Error("Category not found");
      err.name = "NotFoundError";
      throw err;
    }

    res.send({
      title: "Category",
      category: categoryFound,
    });
  } catch (err) {
    next(err);
  }
};

const putCategories = async function (req, res, next) {
  try {
    const update = await db[entity].findAll({
      where: {
        id: req.params.id,
      },
    });
    if (update) {
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
    const { id } = req.params;
    const categoryFound = await db[entity].findByPk(id);

    if (!categoryFound) {
      const err = new Error("Category not found");
      err.name = "NotFoundError";
      throw err;
    }

    const categoryDeleted = await categoryFound.destroy();

    res.send({
      title: "Categories",
      message: "The category has been deleted",
      categoryDeleted,
    });
  } catch (err) {
    next(err);
  }
};

const categoriesController = {
  getCategoryById,
  getAllCategories,
  putCategories,
  deleteCategory,
  createCategory,
};

module.exports = categoriesController;
