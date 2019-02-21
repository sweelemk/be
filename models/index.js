const Sequelize = require('sequelize');
const sequelize = new Sequelize('orgeng', 'sweelemk', '3726477', {
    dialect: 'postgres',
    underscored: true
});

const models = {
    // Teachers: sequelize.import('./teacher'),
    // Pupil: sequelize.import('./pupils'),
    Users: sequelize.import('./users.js')
};

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
