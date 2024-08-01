const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const SQLUser = require('./User');

class UserBook extends Model{}

UserBook.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: SQLUser,
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      book_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'SQLBook',
          key: 'id'
        },
      }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "userbook",
      }
);

module.exports = UserBook;