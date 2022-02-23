const yup = require("yup");

const userDeleteSchema = yup.object().shape({
    id: yup.string("Id need to be a string").required('Id is required')
});

const userUpdateSchema = yup.object().shape({
    firstName: yup.string('Name need to be a string').required('Name is required'),
    lastName: yup.string('Surname need to be a string').required('Surname is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required("Password is required").min(6).max(50),
    role: yup.string().test('match', 'Invalid role', role => role === 'user' || role === 'admin' ? true : false)
});

const userCreateSchema = yup.object().shape({
    firstName: yup.string('Name need to be a string').required('Name is required'),
    lastName: yup.string('Surname need to be a string').required('Surname is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required("Password is required").min(6).max(50),
    role: yup.string().required("Role is required").test('match', 'Invalid role', role => role === 'user' || role === 'admin' ? true : false)
});

module.exports = {
    userDeleteSchema,
    userUpdateSchema,
    userCreateSchema
}