var express = require('express');
var router = express.Router();

const Activity = require('../models/activities')

router.get('/activities', function(req, res, next) {
  
  Activity.findAll()
    .then(activities => {
      console.log(activities);
      res.render('activities', { title: 'Activities', activities })
    })
    .catch(err => console.log(err))

});

module.exports = router;
