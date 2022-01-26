var express = require('express');
var router = express.Router();

const db = require('../models')
//const New = require('../models/news')

router.put('/news/:id', function(req, res, next) {
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

});


module.exports = router;