const db = require("../models");
const entity = "organization";
const { uploadFile } = require("../services/aws_s3");
const { parseS3Url } = require("../helpers/parseS3Url");
// El endpoint deberá devolver un JSON con los campos name, image, phone, address y welcomeText


  
const getOrganization = async function (req, res, next) {
  const { id } = req.params;
  let err = []
  try {
   
 
    const organization = await db[entity].findOne({ where: { id: id } });
    let socials = await db['socials'].findOne({ where: { organizationId: id } });

    if (!socials) socials = null;

    if (!organization) {
      err = new Error('Organization not found');
      err.name = '';
      throw err;
    }

    if (organization.image) {
      const parsedImage = parseS3Url(organization.image);
      organization.image = parsedImage;
    }

    const { name, image,email, phone, address, welcomeText } = organization;

    if (![name, image,email, phone, address, welcomeText].every(Boolean)) {
      err = new Error('One of the fields of the organization is null');
      err.name = '';
      throw err;
    }
    res.json(organization);
  } catch (error) {
    next(error);
  }
};
const getOrganizations = async function (req, res, next) {
  try {
    const organizationsFound = await db[entity].findAll();
    if (organizationsFound) {

      const organizations = organizationsFound.map((item) => {
        if (item.image) {
          const parsedImage = parseS3Url(item.image);
          item.image = parsedImage;
        }
        return item;
      });
      res.send({
        organizations,
      });
    } else {
      let err = new Error("Organizations not found");
      err.name = "NotFoundError";
      throw err;
    }


  } catch (err) {
    next(err);
  }

}

const editOrganization = async function (req, res, next) {
  try {
    const { id } = req.params;


    let { address, name, phone, email, welcomeText } = req.body


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
    }


    const organizationFounded = await db[entity].findByPk(id);

    if (organizationFounded) {

      const organizationUpdated = await db[entity].update(
        data,
        { where: { id } });
      if (organizationUpdated) {
        return res.status(200).send({
          title: "Organization",
          message: "Organization updated successfully",
          organizationUpdated
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
}

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

    next(err)

  }
}

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
}
const organizationsController = {
  getOrganization,
  createOrganization,
  editOrganization,
  getOrganizations,
  deleteOrganization,
 
};

module.exports = organizationsController;
