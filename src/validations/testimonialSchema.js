const yup = require("yup");

const testimonialsCreatorSchema = yup.object().shape({
  name: yup.string("Name must be a string").required("Name is required"),
  content: yup.string("Content must be a string").required("Content is required")
})

module.exports = {testimonialsCreatorSchema}