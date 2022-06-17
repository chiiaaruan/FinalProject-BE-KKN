const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('auth',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            refresh_token: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            underscored: true
        });
};