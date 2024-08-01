const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class SQLBook extends Model{}

SQLBook.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        datePublished: {
            type: DataTypes.DATE
        },
        summary: {
            type: DataTypes.STRING,
        },
        rating: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "Book",
      }
);

module.exports = SQLBook;