const yup = require("yup");

const testimonialsCreatorSchema = yup.object().shape({
  title: yup.string("Title must be an string").required("Title is required"),
  content: yup.string("Title must be an string").required("Content is required")
})

module.exports = {testimonialsCreatorSchema}