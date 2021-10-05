const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-udemy', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
