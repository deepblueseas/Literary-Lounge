const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require('./User');

class UserBookclub extends Model{}

UserBookclub.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: User,
              key: 'id'
            },
            onDelete: 'CASCADE'
          },
          bookclub_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'Bookclub',
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