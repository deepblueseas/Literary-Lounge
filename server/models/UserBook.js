const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require('./User');

class UserBook extends Model{}

UserBook.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
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
        modelName: "Userbook",
      }
);

module.exports = UserBook;