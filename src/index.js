let express = require('express');
let app = express();
let path = require('path');
let routePerson = require('./routes/person');

app.use((req, res, next) => {
    console.log(`${new Date().toDateString()} => ${req.originalUrl}`);
    next();
});
app.use(routePerson);
app.use(express.static('build'));

app.use((req, res, next) => {
   res.status(404).send('We think you are lost!')
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.sendFile(path.join(__dirname, '../build/500.html'));
});

let PORT = process.env.ENV || 5000;
app.listen(PORT, () => console.log(`Server has started ${PORT}`));