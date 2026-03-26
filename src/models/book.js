const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'books',
  timestamps: true,
  underscored: false,
});

module.exports = Book;