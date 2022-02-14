const yup = require("yup");

const FILE_SIZE = 10000000; // Bytes (10MB)
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

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
  
  module.exports = { fileSchema };