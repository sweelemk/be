let express = require('express');
let router = express.Router();
let models = require('../models');

// Get all teachers
router.get('/api/teachers', (req, res) => {
   models.Teachers.findAll().then(teacher => {
       res.json(teacher);
   });
});

//Create teacher
router.post('/api/teachers', (req, res) => {
    models.Teachers.create(req.body)
        .then(teacher => {
            res.json(teacher)
        });
});

// get pupils
router.get('/api/teachers/:id/pupils', (req, res) => {
    let _id = req.params.id;
    models.Pupil.findAll({
        where: {
            teacher_id: _id,
        }
    }).then( result => {
        res.json(result);
    });
});

module.exports = router;