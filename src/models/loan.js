const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Loan = sequelize.define('Loan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    return_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    actual_return_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'Loans',
    timestamps: true,
    underscored: false,
});

module.exports = Loan;