let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let models = require('../models');

router.post('/api/auth', (req, res) => {

    const {email, password} = req.body;

    models.Users.findOne({
        where: {
            email: email
        }
    })
        .then(user => {
            if (user && user.isValidPassword(password)) {
                res.json(user.toAuthJSON());
            } else {
                res.status(400).json({errors: {global: 'Invalid credentials.'}});
            }
        });
});

function validUser(user) {
    const validEmail = typeof user.email == 'string' && user.email.trim() != '';
    const validPass = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 6;

    return validEmail && validPass;
}

router.post('/api/register', (req, res) => {
    if (validUser(req.body)) {
        models.Users.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if (!user) {
                    bcrypt.hash(req.body.password, 10)
                        .then((hash) => {
                            const { firstName, lastName, email, languages, userType } = req.body;
                            const newUser = {
                                name: firstName,
                                surname: lastName,
                                passwordHash: hash,
                                email: email,
                                role: userType,
                                languages: languages,
                                created_at: new Date(),
                                updated_at: new Date()
                            };
                            models.Users
                                .create(newUser)
                                .then(user => {
                                    res.json({
                                        user,
                                        message: 'This is unique user'
                                    });
                                })
                        });
                } else {
                    res.status(400).json({errors: {global: 'Email is use '}});
                }
            });
    } else {
        res.status(400).json({errors: {global: 'Unvalid user'}});
    }
});

module.exports = router;
