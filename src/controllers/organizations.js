const db = require('../models');
const entity = 'organization';

// El endpoint deberá devolver un JSON con los campos name, image, phone, address y welcomeText

const getOrganization = async function(req, res, next) {
    try {
        const { id } = req.params;
        const error = [];

        const organization = await db[entity].findOne({ where: { id } });

        if (!organization || organization === null) error.push({ text: 'Organization not found' });

        const { name, image, phone, address, welcomeText } = organization;
        if (![name, image, phone, address, welcomeText].every(Boolean)) error.push({ text: 'One of the fields of the organization is null' });

        if (error.length > 0) return res.send({ title: 'Organizaciones', messageErr: error });
        res.json({
            name,
            image,
            phone,
            address,
            welcomeText
        });
    } catch (error) {
        next(error);
    }
}

const organizationsController = {
    getOrganization
};
    
module.exports = organizationsController;