const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconnection');
const Recipe = require('./recipeModel');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  recipes: {
    type: DataTypes.ARRAY(DataTypes.JSONB), 
    defaultValue: [],
  }},
  {
    timestamps: false, // Add this line to disable automatic timestamps
  }
);

const OrderRecipe = sequelize.define('order_recipes', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Order.belongsToMany(Recipe, { through: OrderRecipe });
Recipe.belongsToMany(Order, { through: OrderRecipe });

module.exports = Order;
