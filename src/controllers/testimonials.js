const entity = 'testimonials'
const db = require('../models')
const { uploadFile } = require('../services/aws_s3')

const createTestimonial = async function(req, res, next) {
    try{
    if (req.file){
    const {url} = await uploadFile(req.file, next)
    req.body.lastimage = url
    }
    const testimonialCreated = await db[entity].create(req.body)
    return res.status(201).send({
        title: 'Testimonials',
        message: 'The Testimonial has been created successfully',
        newTestimonial: testimonialCreated})
    }
    catch(err){
        next(err)
    }
}
const testimonialsController = {
    createTestimonial
}

module.exports = testimonialsController