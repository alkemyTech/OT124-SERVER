const entity = 'testimonials'
const db = require('../models')

const createTestimonial = async function(req, res, next) {
    try{
    await db[entity].create(req.body)
    return res.status(200).send({
          errors: null,
          msg: 'Testimonial created'})
    }
    catch(err){
        next(err)
    }
}
const testimonialsController = {
    createTestimonial
}

module.exports = testimonialsController