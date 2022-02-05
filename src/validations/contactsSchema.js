const yup = require("yup");

const contactPostSchema = yup.object().shape({
  name: yup.string('Name must be a string').required('Name is required'),
  email: yup.string('Must be a string').required('Email is required').email('Invalid email format'),
 // phone: yup.phone('Must be a phone'),
  message: yup.string('Must be a string')
});

module.exports = { 
  contactPostSchema
};