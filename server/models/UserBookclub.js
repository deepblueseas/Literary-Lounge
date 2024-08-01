const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const SQLUser = require('./User');

class UserBookclub extends Model{}

UserBookclub.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: SQLUser,
              key: 'id'
            },
            onDelete: 'CASCADE'
          },
          bookclub_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'SQLBookclub',
              key: 'id'
            },
          }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "UserBookclub",
      }
);

module.exports = UserBookclub;