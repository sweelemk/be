let express = require('express');
let router = express.Router();
let models = require('../models');

router.post('/api/auth', (req, res) => {

    const { email, password } = req.body;

    models.Users.
        findOne({
            where: {
                email: email
            }
        })
        .then(user => {
            if(user && user.isValidPassword(password)) {
                res.json(user.toAuthJSON())
            } else {
                res.status(400).json({ errors: { global: 'Invalid credentials.' }})
            }
        });
});

module.exports = router;
