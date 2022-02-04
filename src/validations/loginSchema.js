const yup = require("yup");

const loginSchema = yup.object().shape({
email: yup
.string()
.required("email is required")
.email("Invalid email format"),
password: yup.string().required("password is required").min(6).max(50),
})

module.exports = { loginSchema };