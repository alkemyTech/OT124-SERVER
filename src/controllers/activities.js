const Activity = require('../models/activities');

const getActivities = async function(req, res, next) {
    try {
        const listActivity = await Activity.findAll()
        res.send({ title: 'Activities', listActivity })
    } catch(err){
        next(err)
    }
}

const postActivities = async function(req, res, next) {
    try {
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
            const newActivity = await Activity.create({ name, content, img})
            res.send({ title: 'Activities', message: "Actividad creada con exito!", newActivity: newActivity })
        } 
    }
    catch(err){
        next(err)
    }
}


const activityController = {
    getActivities,
    postActivities
};

module.exports = activityController;