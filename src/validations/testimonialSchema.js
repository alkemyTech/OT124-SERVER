const yup = require("yup");

const testimonialsCreatorSchema = yup.object().shape({
  name: yup.string("name must be an string").required("name is required"),
  content: yup.string("Title must be an string").required("Content is required")
})

module.exports = {testimonialsCreatorSchema}