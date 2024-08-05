const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class BookclubBook extends Model{}

BookclubBook.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      bookclub_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Bookclub',
          key: 'id',
        },
      },
      book_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Book',
            key: 'id',
        },
      },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "BookclubBook",
    }
);

module.exports = BookclubBook;