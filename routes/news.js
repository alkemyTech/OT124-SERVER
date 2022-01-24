var express = require('express');
var router = express.Router();
const entity = 'News'
const db = require('../models/db')

/* DELETE new by ID. */
router.delete('/:id', async function(req, res, next) {
  try{
  const {id} = req.params 
  if (!id){
    let err = new Error('Id missing')
    err.name = 'NotParamError'
    throw err
  }
  const deletedNew = await db[entity].destroy({ where: id })
  if (deletedNew){
  return res.status(200).send({
      errors: null,
      msg: 'New deleted'})
  }
  let err = new Error('New not found, New Id Invalid')
  err.name = 'NotFoundError'
  throw err
  }
  catch(err){
    console.log(err.name)
    next(err)
  }
});

module.exports = router;