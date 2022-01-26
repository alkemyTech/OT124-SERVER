var express = require('express');
var router = express.Router();

const Activity = require('../models/activities')

router.get('/activities', function(req, res, next) {
  
  Activity.findAll()
    .then(activities => {
      console.log(activities);
      res.send({ title: 'Activities', activities })
    })
    .catch(err => console.log(err))

});

router.post('/activities' , function(req, res, next) {
  const {name , img , content} = req.body;
  const error = [];

  if(!name) {
    error.push({text: "Agregar el nombre de la actividad"})
  }
  if (!content) {
    error.push({text: "Agregar una breve descripcion de la actividad"})
  }
  if (error.length > 0) {
    return res.send({title: 'Activities', message: error})
  } else {
    Activity.create({
      name,
      content,
      img
   })
      .then(activities => res.send({ title: 'Activities', message: "Actividad creada con exito!" }))
      .catch((err) => console.log(err));

  }
})
  

module.exports = router;
