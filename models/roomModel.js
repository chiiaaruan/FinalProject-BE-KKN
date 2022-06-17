const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('room',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            room_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            },
        });
};