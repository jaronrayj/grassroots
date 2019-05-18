module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("user", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        len: [6]
      }
    },
    logged_in: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
      isIn: [
        ['true', 'false', 0, 1]
      ]
    }
  });
  return User;
};