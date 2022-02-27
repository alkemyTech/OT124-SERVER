const db = require("../models");
const entity = "organization";
const { uploadFile } = require("../services/aws_s3");
const { parseS3Url } = require("../helpers/parseS3Url");
const { calculatePagination } = require("../helpers/calculatePagination");
const { generateSearch } = require("../helpers/generateSearch");
// El endpoint deberá devolver un JSON con los campos name, image, phone, address y welcomeText

const getOrganization = async function (req, res, next) {
  const { id } = req.params;
  let err = [];

  try {
    const organizationFound = await db[entity].findOne({
      where: {
        id,
      },
      include: db.socials,
    });

    if (!organizationFound) {
      err = new Error("Organization not found");
      err.name = "NotFoundError";
      throw err;
    }

    if (organizationFound.image) {
      const parsedImage = parseS3Url(organizationFound.image);
      organizationFound.image = parsedImage;
    }

    res.send({
      Title: "Organization",
      organization: organizationFound,
    });
  } catch (error) {
    next(error);
  }
};

const getOrganizations = async function (req, res, next) {
  const { size, page, search } = req.query;
  try {
    const { limit, offset } = calculatePagination(size, page);

    const searchQuery = generateSearch(entity, search);

    const organizationsFound = await db[entity].findAndCountAll({
      limit,
      offset,
      ...searchQuery,
    });
    if (organizationsFound) {
      const organizations = organizationsFound?.rows?.map((item) => {
        if (item.image) {
          const parsedImage = parseS3Url(item.image);
          item.image = parsedImage;
        }
        return item;
      });
      res.send({
        organizations,
        count: organizationsFound?.count,
      });
    } else {
      let err = new Error("Organizations not found");
      err.name = "NotFoundError";
      throw err;
    }
  } catch (err) {
    next(err);
  }
};

const editOrganization = async function (req, res, next) {
  try {
    const { id } = req.params;

    let { address, name, phone, email, welcomeText } = req.body;

    let image;
    const error = [];
    if (req.file) {
      const { url } = await uploadFile(req.file, next);
      image = url;
    }
    //creo el data para comparar a mi conveniencia con la base de datos
    let data = {
      name,
      image,
      address,
      phone,
      email,
      welcomeText,
    };

    const organizationFounded = await db[entity].findByPk(id);

    if (organizationFounded) {
      const organizationUpdated = await db[entity].update(data, {
        where: { id },
      });
      if (organizationUpdated) {
        return res.status(200).send({
          title: "Organization",
          message: "Organization updated successfully",
          organizationUpdated,
        });
      }
    } else {
      let err = new Error("Organization not found, Organization id invalid");
      err.name = "NotFoundError";
      throw err;
    }
  } catch (err) {
    next(err);
  }
};

const deleteOrganization = async function (req, res, next) {
  try {
    const { id } = req.params;

    const organizationFound = await db[entity].findByPk(id);
    if (!organizationFound) {
      const err = new Error("Organization not found");
      throw err;
    }
    const OrganizationDeleted = await organizationFound.destroy();
    if (OrganizationDeleted) {
      res.status(200).send({
        title: "Organization",
        message: "The Organization has been deleted successfully",
      });
    }
  } catch (err) {
    next(err);
  }
};

const createOrganization = async function (req, res, next) {
  try {
    let { name, address, phone, email, welcomeText } = req.body;
    let image;
    if (req.file) {
      const { url } = await uploadFile(req.file, next);
      image = url;
    }
    const organizationCreated = await db[entity].create({
      name,
      address,
      phone,
      email,
      welcomeText,
      image,
    });
    return res.status(201).send({
      title: "Organizations",
      message: "The Organization has been created successfully",
      newOrganization: organizationCreated,
    });
  } catch (err) {
    next(err);
  }
};
const organizationsController = {
  getOrganization,
  createOrganization,
  editOrganization,
  getOrganizations,
  deleteOrganization,
};

module.exports = organizationsController;
