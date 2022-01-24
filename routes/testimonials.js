var express = require('express');
var router = express.Router();
const entity = 'Testimonials'
const db = require('../models/db')

/* POST testimonials content. */
router.post('/', async function(req, res, next) {
    try{
    const {title, content} = req.body
    if (!title){
        let err = new Error('Title is missing')
        err.name = 'NotParamError'
        throw err
    }
    if (!content){
        let err = new Error('Content is missing')
        err.name = 'NotParamError'
        throw err
    }
    await db[entity].create(req.body)
    return res.status(200).send({
          errors: null,
          msg: 'Testimonial created'})
    }
    catch(err){
        next(err)
    }
});

module.exports = router;