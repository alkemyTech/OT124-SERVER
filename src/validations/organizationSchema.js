
const yup = require("yup");
const organizationPostSchema = yup.object().shape({
    name: yup.string().required("name is required"),
    address: yup.string().required("address is required"),
    welcomeText: yup.string().required("welcomeText is required"),
    phone: yup.string().min(8).max(12).required("phone is required"),
    email: yup
    .string()
    .required("email is required")
    .email("Invalid email format"),
});


module.exports = { organizationPostSchema }