// modifierModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconnection');
const Recipe = require('./recipeModel');
const Order = require('./orderModel');
const  Product  = require('./productsModel');

const Modifier = sequelize.define('Modifier', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Modifier.belongsTo(Order);
Modifier.belongsTo(Recipe);
Modifier.belongsTo(Product);
Recipe.hasMany(Modifier);
Order.hasMany(Modifier);



module.exports = Modifier;
