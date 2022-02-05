const yup = require("yup");

const FILE_SIZE = 5000000; // Bytes (5MB)
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
    })
    .required("File is required"),
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
