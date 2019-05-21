module.exports = function (sequelize, DataTypes) {

    var Project = sequelize.define("Project", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
                isAfter: DataTypes.NOW
            }
        },
        number_of_people: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        category_type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Project.associate = function (models) {
        Project.hasMany(models.User, {
            as: "project_id",
            constraints: false,
            allowNull: true,
            defaultValue: null
        });
    };
    return Project;
};
