module.exports = (sequelize, DataTypes) => {
    const Pupil = sequelize.define('pupil', {
        user: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        teacher_id: {
            type: DataTypes.INTEGER
        }
    }, {
        underscored: true
    });

    Pupil.associate = function(models) {
        models.Pupil.belongsTo(models.Teachers, {
            foreignKey: 'teacher_id',
            targetKey: 'id'
        })
    };

    return Pupil;
};