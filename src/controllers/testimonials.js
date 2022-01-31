const entity = 'testimonials'
const db = require('../models')
const { uploadFile } = require('../services/aws_s3')

const createTestimonial = async function(req, res, next) {
    try{
    if (req.file){
    const {key} = await uploadFile(req.file, next) 
    req.body.lastimage = key
    }
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