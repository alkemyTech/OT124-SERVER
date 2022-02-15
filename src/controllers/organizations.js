const db = require("../models");
const entity = "organization";

const getOrganization = async function (req, res, next) {
  try {
    const { id } = req.params;
    let err;

    const organization = await db[entity].findOne({ where: { id: id } });
    let socials = await db['socials'].findOne({ where: { organizationId: id } });

    if (!socials) socials = null;

    if (!organization) {
      err = new Error('Organization not found');
      err.name = '';
      throw err;
    }

    const { name, image, phone, address, welcomeText } = organization;
    if (![name, image, phone, address, welcomeText].every(Boolean)) {
      err = new Error('One of the fields of the organization is null');
      err.name = '';
      throw err;
    }

    res.json({
      name,
      image,
      phone,
      address,
      welcomeText,
      socials
    });
  } catch (error) {
    next(error);
  }
};

const organizationsController = {
  getOrganization
};

module.exports = organizationsController;
