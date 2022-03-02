const yup = require("yup");

const updateSlideSchema = yup.object().shape({
  text: yup.string("Text must be a string").required("Text is required"),
  order: yup.number("Must be a number")
});

module.exports = {
    updateSlideSchema
}