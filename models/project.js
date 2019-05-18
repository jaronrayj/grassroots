/* eslint-disable prettier/prettier */
/* eslint-disable indent */
module.exports = function (sequelize, DataTypes) {
    var Project = sequelize.define("project", {
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
        // eslint-disable-next-line camelcase
        number_of_people: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        // eslint-disable-next-line camelcase
        category_type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Project;
};
