const yup = require("yup");

const entriesCreatorSchema = yup.object().shape({
  name: yup.string("Name must be a string").required("Name is required"),
  content: yup.string("Content must be a string").required("Content is required"),
  image: yup.string("Content must be a string").required("Content is required"),
  type: yup.string("Content must be a string").required("Content is required"),
  categoryId: yup.number("ContentId must be a number").required("ContentId is required").positive().integer()
})

module.exports = {entriesCreatorSchema}