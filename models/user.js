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
      defaultValue: true,
      isIn: [["true", "false", 0, 1]]
    }
  });
  User.associate = (models) => {
    User.belongsToMany(models.Project, {
      through: "ProjectUser",
      foreignKey: "ProjectId"
    });
  };
  return User;
};
