module.exports = (sequelize, DataTypes) => {
    const Teachers = sequelize.define('teacher', {
        user: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        }
    }, {
        underscored: true
    });

    Teachers.associate = function(models) {
        models.Teachers.hasMany(models.Pupil, {
            sourceKey: 'id',
            foreignKey: 'teacher_id'
        });
    };

    return Teachers;
};