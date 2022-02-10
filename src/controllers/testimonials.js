const entity = 'testimonials'
const db = require('../models')
const { uploadFile } = require('../services/aws_s3')

const createTestimonial = async function(req, res, next) {
    try{
    let { name, content, lastimage} = req.body;
    if (req.file){
    const {url} = await uploadFile(req.file, next)
    lastimage = url
    }
    const testimonialCreated = await db[entity].create({name, content, lastimage})
    return res.status(201).send({
        title: 'Testimonials',
        message: 'The Testimonial has been created successfully',
        newTestimonial: testimonialCreated})
    }
    catch(err){
        next(err)
    }
}

const updateTestimonial = async function (req, res, next) {
    try {
      const { id } = req.params;
      let { name, content, lastimage, key} = req.body;
      if (req.file){
          if (key){
            const {url} = await updateFile(req.file, key, next)
            lastimage = url
          }
          else{
            const {url} = await uploadFile(req.file, next)
            lastimage = url
          } 
      }
      else{
        if (key){
          // await deleteFile(key, next) //Access Denied
          // image = null
          const url = generateS3Url(key)
          lastimage = url
        }
      }
        const testimonialUpdated = await db[entity].update(
          { name, content, lastimage },
          { where: { id: id } }
        ); 
        if (testimonialUpdated) {
          return res.status(200).send({
            title: "Testimonials",
            message: "Testimonial updated successfully",
            testimonialUpdated,
          });
        } else {
          let err = new Error("Testimonial not found, Testimonial id invalid");
          err.name = "NotFoundError";
          throw err;
        }
    } catch (err) {
      next(err);
    }
  };

  
const testimonialsController = {
    createTestimonial,
    updateTestimonial
}

module.exports = testimonialsController