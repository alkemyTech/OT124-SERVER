const yup = require("yup");

const userDeleteSchema = yup.object().shape({
    id: yup.string("id need to be a string").required('id is required')
});

const userUpdateSchema = yup.object().shape({
    firstName: yup.string('name need to be a string').required('name is required'),
    lastName: yup.string('surname need to be a string').required('surname is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    role: yup.string().test('match', 'invalid role', role => role === 'user' || role === 'admin' ? true : false)
});

module.exports = {
    userDeleteSchema,
    userUpdateSchema
}