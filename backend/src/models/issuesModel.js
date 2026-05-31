const { db, DataTypes } = require("../config/db");
const { Sequelize } = require("sequelize");

const Issue = db.define(
    "issue", 
    { 
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        category: {
            defaultValue: "General",
            type: DataTypes.STRING(255)
        },
        status: {
            defaultValue: "Open",
            type: DataTypes.ENUM("Open", "In progress", "Closed"),
        },
        votes: {
            defaultValue: 0,
            type: DataTypes.INTEGER
        }
    }
);

module.exports = Issue;
