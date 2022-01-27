const yup = require("yup");

const userDeleteSchema = yup.object().shape({
    id: yup.required('id is required')
})

module.exports = {userDeleteSchema}