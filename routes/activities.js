var express = require('express');
var router = express.Router();

// const db = require('../config/database')
const Activity = require('../models/activities')

router.get('/activities', function(req, res, next) {
  
  Activity.findAll()
    .then(activities => {
      console.log(activities);
      res.sendStatus(200);
    })
    .catch(err => console.log(err))

});

module.exports = router;
