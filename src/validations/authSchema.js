const yup = require("yup");

const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("firstName is required")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
      "Only alphabets are allowed for this field "
    ),
  lastName: yup
    .string()
    .required("lastName is required")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
      "Only alphabets are allowed for this field "
    ),
  email: yup
    .string()
    .required("email is required")
    .email("Invalid email format"),
  password: yup.string().required("password is required").min(6).max(50),
});

const loginSchema = yup.object().shape({
  email: yup
  .string()
  .required("email is required")
  .email("Invalid email format"),
  password: yup.string().required("password is required").min(6).max(50),
  })
  

module.exports = { registerSchema,loginSchema  };
