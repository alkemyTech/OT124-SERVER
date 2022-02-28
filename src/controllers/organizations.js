const db = require("../models");
const entity = "organization";
const { uploadFile, updateFile } = require("../services/aws_s3");
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
  const { id } = req.params;
  const { body } = req;

  try {
    // Find organization to update
    const organizationFound = await db[entity].findOne({
      where: {
        id,
      },
    });

    // If not found, return
    if (!organizationFound) {
      const error = new Error("Organization not found");
      error.name = "NotFoundError";
      throw error;
    }

    // If a file was sent
    if (req.file) {
      // If also a key was provided, update file with key and and update organizationFound url
      if (body.key) {
        const { url } = await updateFile(body.key, req.file, next);
        organizationFound.image = url;
        // If the is no provided key, upload new file and update organizationFound url
      } else {
        const { url } = await uploadFile(req.file, next);
        organizationFound.image = url;
      }
    }

    // If name was provided, update organizationfound
    if (body.name) {
      organizationFound.name = body.name;
    }
    // If phone was provided, update organizationFound
    if (body.phone) {
      organizationFound.content = body.content;
    }
    // If email was provided, update organizationfound
    if (body.email) {
      organizationFound.email = body.email;
    }
    // If address was provided, update organizationfound
    if (body.address) {
      organizationFound.address = body.address;
    }
    // If welcomeText was provided, update organizationfound
    if (body.welcomeText) {
      organizationFound.welcomeText = body.welcomeText;
    }

    // Save new organizationFound properties in db
    await organizationFound.save();

    return res.status(200).json({
      title: "Organizations",
      message: "The organization has been updated successfully",
    });
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
