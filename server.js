let express = require('express');
let app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const models = require('./models');
const teacherRoute = require('./routes/teacher');
// const pupilRoute = require('./routes/pupil');
const usersRoute = require('./routes/user');
const authRoute = require('./routes/auth');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(teacherRoute);
// app.use(pupilRoute);
app.use(usersRoute);
app.use(authRoute);

let PORT = 5000;

models.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server has started ${PORT}`));
});
