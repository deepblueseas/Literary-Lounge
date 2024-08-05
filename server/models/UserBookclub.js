const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserBookclub extends Model {}

UserBookclub.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  bookclub_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Bookclub',
      key: 'id',
    },
  },
}, {
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: 'UserBookclub',
});

module.exports = UserBookclub;