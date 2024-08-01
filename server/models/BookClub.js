const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class SQLBookclub extends Model{}

SQLBookclub.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        clubName: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        location: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "SQLBookclub",
      }
);

module.exports = SQLBookclub;