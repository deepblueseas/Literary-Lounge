const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcryptjs = require('bcryptjs');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
  },
    username: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        len: [5, Infinity],
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'User',
  }
);

// set up pre-save middleware to create password
User.beforeSave(async (user) => {
  if (user.changed("password")) {
    const saltRounds = 10;
    user.password = await bcryptjs.hash(user.password, saltRounds);
  }
});

// compare the incoming password with the hashed password
User.prototype.isCorrectPassword = async function (password) {
  return bcryptjs.compare(password, this.password);
};

module.exports = User;