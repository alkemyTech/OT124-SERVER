const yup = require("yup");

const FILE_SIZE = 10000; // Bytes (10MB)
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const newsCreatorSchema = yup.object().shape({
  name: yup.string("Name must be a string").required("Name is required"),
  content: yup
    .string("Content must be a string")
    .required("Content is required"),
  type: yup.string("Type must be a string").required("Type is required"),
  categoryId: yup
    .number("CategoryId must be a number")
    .required("CategoryId is required")
    .positive()
    .integer(),
});

const fileSchema = yup.object().shape({
  file: yup
    .mixed()
    .test("fileSize", "File Size is too large", (value) => {
      if (value == null) {
        return true;
      } else {
        return value.size <= FILE_SIZE;
      }
    })
    .test("fileType", "Unsupported File Format", (value) => {
      if (value == null) {
        return true;
      } else {
        return SUPPORTED_FORMATS.includes(value.mimetype);
      }
    }),
});

module.exports = { newsCreatorSchema, fileSchema };
