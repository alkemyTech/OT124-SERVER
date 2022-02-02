const yup = require("yup");

const memberPostSchema = yup.object().shape({
  name: yup.string('Name must be a string').required('Name is required'),
  image: yup.string('Image must be a string')
});

module.exports = { 
    memberPostSchema
};