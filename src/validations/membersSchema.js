const yup = require("yup");

const memberPostSchema = yup.object().shape({
  name: yup.string('Name must be a string').required('Name is required')
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


module.exports = { 
    memberPostSchema,
    fileSchema
};