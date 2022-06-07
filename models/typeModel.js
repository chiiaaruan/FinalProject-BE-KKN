const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('type',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            type_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
        });
};