const yup = require("yup");

const newsCreatorSchema = yup.object().shape({
  name: yup.string("Name must be a string").required("Name is required"),
  content: yup
    .string("Content must be a string")
    .required("Content is required"),
  type: yup.string("Type must be a string").required("Type is required"),
  categoryId: yup
    .number("CategoryId must be a number")
    .required("Category is required")
    .positive()
    .integer(),
});

module.exports = { newsCreatorSchema };
