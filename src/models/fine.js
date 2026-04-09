const {DataTypes} = require('sequelize');
const sequelize = require('../database/sequelize');

const Fine = sequelize.define('Fine', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    loan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    fineType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'Fines',
    timestamps: true,
    underscored: false,
});

module.exports = Fine;