const db = require('../models')
const entity = 'News'

const deleteNew =  async function(req, res, next) {
    try{
    const {id} = req.params
    const deletedNew = await db[entity].destroy({ where: {id: id} })
    if (deletedNew){
    return res.status(200).send({
        errors: null,
        msg: 'New deleted'})
    }
    let err = new Error('New not found, New id invalid')
    err.name = 'NotFoundError'
    throw err
    }
    catch(err){
      next(err)
    }
  }

const newsController = {
    deleteNew
};

module.exports = newsController;