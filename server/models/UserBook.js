const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require('./User');

class UserBook extends Model{}

UserBook.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      book_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Book',
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