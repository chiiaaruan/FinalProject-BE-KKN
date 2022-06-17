const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('furniture',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                allowNull: false,
                type: DataTypes.BIGINT,
                validate: {
                    min: 0,
                }
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            },
        });
};