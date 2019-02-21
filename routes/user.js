let express = require('express');
let router = express.Router();
let models = require('../models');

router.get('/api/users', (req, res) => {
    models.Users.findAll()
        .then(user => {
            res.json(user);
        });
});

router.post('/api/users', (req, res) => {
    models.Users.create(req.body)
        .then(pupil => {
            res.json(pupil);
        });
});


module.exports = router;
