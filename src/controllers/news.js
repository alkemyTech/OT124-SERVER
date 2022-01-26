const db = require('../models')
const entity = 'entries'

const updateNew = function(req, res, next) {
    const {id} = req.params
    const {name, content, image, categoryId, type } = req.body
    const error = []

    if (!name) {
      error.push({text: "Agregar un nombre a la novedad"})
    }
    if (!content) {
      error.push({text: "Agregar una breve descripcion a la novedad"})
    }
    if (!categoryId) {
      error.push({text: "Agregar una id a la categoria"})
    }

    if (error.length > 0) {
      res.send({ title: 'Novedades', messageErr: error })
    } else {
      db['News'].update(
          { name, content, image, categoryId, type },
          { where: { _id: id } }
        )
          .then(news =>
              res.send({ title: 'Novedades', message: "Novedad actualizada" })
          )
          .error(err =>
            console.log(err)
          )

    }

};

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
  };

const newsController = {
    deleteNew,
    updateNew
};

module.exports = newsController;