const yup = require("yup");

const userDeleteSchema = yup.object().shape({
    id: yup.number("id need to be a number").required('id is required')    

})

module.exports = {userDeleteSchema}