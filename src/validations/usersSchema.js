const yup = require("yup");

const userDeleteSchema = yup.object().shape({
    id: yup.string("id need to be a string").required('id is required')    

})

module.exports = {userDeleteSchema}