const yup = require("yup");

const categoriesCreatorSchema = yup.object().shape({
  name: yup
  .string("Name must be a string")
  .required("Name is required"),
  description: yup
  .string("Description must be a string")
  .required("Description is required"),
  
})

module.exports = {categoriesCreatorSchema}