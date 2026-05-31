const { DataTypes, db} = require('../config/db');

// Setting Schema for User

const User = db.define(
    "user", {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min:10
            },
        },
        },
        {
            timestamps: true,
        }
    
);

module.exports = { User };