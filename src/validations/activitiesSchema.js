const yup = require("yup");

const FILE_SIZE = 5;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const putActivitiesSchema = yup.object().shape({
  name: yup.string("Name must be a string"),
  image: yup
    .mixed()
    .test(
      "fileSize",
      "File Size is too large",
      (value) => value.size <= FILE_SIZE
    )
    .test("fileType", "Unsupported File Format", (value) =>
      SUPPORTED_FORMATS.includes(value.type)
    ),
  content: yup.string("Content must be a string"),
});

module.exports = { putActivitiesSchema };
