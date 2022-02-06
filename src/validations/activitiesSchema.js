const yup = require("yup");

const FILE_SIZE = 10000000; // Bytes (10MB)
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const activitiesSchema = yup.object().shape({
  name: yup.string("Name must be a string").required("Name is required"),
  content: yup
    .string("Content must be a string")
    .required("content is required"),
});

const putActivitiesSchema = yup.object().shape({
  name: yup.string("Name must be a string"),
  content: yup.string("Content must be a string"),
  key: yup
    .string()
    .trim()
    .matches(
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      "Key is not in correct format"
    ),
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

const putFileSchema = yup.object().shape({
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

module.exports = {
  activitiesSchema,
  putActivitiesSchema,
  fileSchema,
  putFileSchema,
};
