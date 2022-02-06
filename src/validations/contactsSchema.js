const yup = require("yup");

const contactPostSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  phone: yup.string().min(8).max(12),
  message: yup.string()
});

module.exports = { 
  contactPostSchema
};