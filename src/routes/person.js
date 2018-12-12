let express = require('express');
let router = express.Router();

router.get('/person', (req, res) => {
    res.send('You have request for person');
});

router.get('/person/:name', (req, res) => {
    res.send(`You have request for person ${req.params.name}`);
});

router.get('/error', (req, res) => {
    throw Error('This is a forced error');
});

module.exports = router;