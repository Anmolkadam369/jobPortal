const { Sequelize  } = require('sequelize');
const sequelize = new Sequelize('newcompany', 'root', 'anmol@369', {
    host: 'localhost', 
    dialect: 'mysql',
  });

module.exports = { sequelize };