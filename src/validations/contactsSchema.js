const yup = require("yup");

const contactPostSchema = yup.object().shape({
  name: yup.string('Name must be a string').required('Name is required'),
  email: yup.string('Image must be a string').required('Email is required')
});

module.exports = { 
    contactPostSchema
};