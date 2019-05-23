module.exports = function (sequelize, DataTypes) {

  var User = sequelize.define("User", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "User name already in use"
      },
      validate: {
        len: [6],
        not: [" "],
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
        not: [" "],
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
        isEmail: true,
        notEmpty: true
      }
    }
  });

  User.associate = (models) => {
    User.belongsToMany(models.Project, { through: "ProjectUser" });
  };
  return User;
};
