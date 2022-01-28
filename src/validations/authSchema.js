const yup = require("yup");

const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("name is required")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
      "Only alphabets are allowed for this field "
    ),
  lastName: yup
    .string()
    .required("name is required")
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

module.exports = { registerSchema };
