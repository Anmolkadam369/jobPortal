const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconnection');
const Recipe = require('./recipeModel');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

});


module.exports = Product;


// const { DataTypes } = require('sequelize');
// const sequelize = require('../dbconnection'); // Import your Sequelize instance

// const Product = sequelize.define('Product', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
// });

// module.exports = Product;
