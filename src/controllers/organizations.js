const db = require("../models");
const entity = "organization";
const { uploadFile } = require("../services/aws_s3");
const { parseS3Url } = require("../helpers/parseS3Url");
// El endpoint deberá devolver un JSON con los campos name, image, phone, address y welcomeText

const getOrganization = async function (req, res, next) {
  try {
    const { id } = req.params;
    const error = [];

    const organization = await db[entity].findOne({ where: { id } });

    if (!organization || organization === null)
      error.push({ text: "Organization not found" });

    const { name, image, phone, address, welcomeText } = organization;
    if (![name, image, phone, address, welcomeText].every(Boolean))
      error.push({ text: "One of the fields of the organization is null" });

    if (error.length > 0)
      return res.send({ title: "Organizaciones", messageErr: error });
    res.json({
      name,
      image,
      phone,
      address,
      welcomeText,
    });
  } catch (error) {
    next(error);
  }
};
const getOrganizations = async function (req, res, next) {
  try {
    const organizationsFound = await db[entity].findAll();
    if(organizationsFound){

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
    }else{
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
 
    let { name, key } = req.body;
    let image;
    const error = [];
    if (req.file) {
      if (key) {
        const { url } = await updateFile(req.file, key, next);
        image = url;
      } else {
        const { url } = await uploadFile(req.file, next);
        image = url;
      }
    }
    const organizationUpdated = await db[entity].update(
      { name, content, image },
      { where: { id } });
      if (organizationUpdated){
        return res.status(200).send({
          title: "Organization",
          message: "Organization updated successfully",
          organizationUpdated,
        });
      } else {
        let err = new Error("Organization not found, Organization id invalid");
        err.name = "NotFoundError";
        throw err;
      }
   


  } catch (err) {

  }
}

const deleteOrganization = async function (req, res, next) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const error = [];

    const organization = await db[entity].findOne({ where: { id } });



  } catch (err) {

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
};

module.exports = organizationsController;
