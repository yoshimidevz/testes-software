const sequelize = require('../database/sequelize');
const User = require('./User');
const Book = require('./Book');
const Loan = require('./loan');

module.exports = {
  sequelize,
  Book,
  Loan,
  User,
};
