const yup = require("yup");

const contactPostSchema = yup.object().shape({
<<<<<<< HEAD
  name: yup.string('Name must be a string').required('Name is required'),
  email: yup.string('Must be a string').required('Email is required').email('Invalid email format'),
 // phone: yup.phone('Must be a phone'),
  message: yup.string('Must be a string')
=======
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  phone: yup.string().min(8).max(12),
  message: yup.string(),
>>>>>>> a675ebee12ba72e774133e1a0a7e07d6d316bf4c
});

module.exports = {
  contactPostSchema,
};
