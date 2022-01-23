var express = require('express');
var router = express.Router();

// const db = require('../config/database')
// const New = require('../models/news')

router.put('/news/:id', function(req, res, next) {
    const {id} = req.params
    const {name, content, image, categoryId, type } = req.body

    New.update(
        { name, content, image, categoryId, type },
        { where: { _id: 1 } }
      )
        .then(news =>
            res.render('news', { title: 'Novedades', news })
        )
        .error(err =>
          console.log(err)
        )

});

module.exports = router;
