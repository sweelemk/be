let express = require('express');
let router = express.Router();
let models = require('../models');

// Get all pupils
router.get('/api/pupils', (req, res) => {
    models.Pupil.findAll()
        .then(pupil => {
            res.json(pupil);
        });
});

// Get user by ID
router.get('/api/pupils/:id', (req, res) => {
   let _id = req.params.id;
   models.Pupil.findAll({
       where: {
           id: _id,
       }
   }).then( result => {
      res.json(result);
   });
});

// get teacher
router.get('/api/pupils/:id/teacher', (req, res) => {
    let _id = req.params.id;
    models.Teachers.findAll({
        where: {
            id: _id,
        }
    }).then( result => {
        res.json(result);
    });
});

// Add pupil
router.post('/api/pupils', (req, res) => {
    models.Pupil.create(req.body)
        .then(pupil => {
            res.json(pupil)
        });
});


module.exports = router;
