let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        surname: {
            type: DataTypes.STRING
        },
        passwordHash: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.STRING
        },
        languages: {
            type : DataTypes.ARRAY(DataTypes.JSON),
            defaultValue: [],
            get() {
                const data = this.getDataValue('languages');
                const toSend = [];
                data.forEach(val => {
                    toSend.push(typeof val === 'string' ? JSON.parse(val) : val);
                });
                return toSend;
            }
        }
    }, {
        underscored: true
    });

    Users.prototype.generateJWT = function() {
        return jwt.sign({
            email: this.email
        }, 'secretkey')
    };

    Users.prototype.isValidPassword = function(password) {
        return bcrypt.compareSync(password, this.passwordHash);
    };

    Users.prototype.toAuthJSON = function() {
        return {
            email: this.email,
            token: this.generateJWT()
        }
    };

    return Users;
};
