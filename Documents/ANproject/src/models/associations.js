// associationModel.js
const Product = require('./productsModel');
const Recipe = require('./recipeModel');
const Order = require('./orderModel');
const Modifier = require('./modifierModel');

// Define associations between models
Recipe.belongsToMany(Product, { through: 'recipe_products' });
Product.belongsToMany(Recipe, { through: 'recipe_products' });

Order.belongsToMany(Recipe, { through: 'order_recipes' });
Recipe.belongsToMany(Order, { through: 'order_recipes' });

Modifier.belongsTo(Order);
Modifier.belongsTo(Recipe, { foreignKey: 'recipeId' }); // Specify the foreign key name
Modifier.belongsTo(Product, { foreignKey: 'productId' }); // Specify the foreign key name
Recipe.hasMany(Modifier, { foreignKey: 'recipeId' }); // Specify the foreign key name
Order.hasMany(Modifier);

module.exports = { Product, Recipe, Order, Modifier };



// association model

// const Product = require('./productsModel');
// const Recipe = require('./recipeModel');
// const Order = require('./orderModel');
// const Modifier = require('./modifierModel');

// // Define associations between models
// Recipe.belongsToMany(Product, { through: 'recipe_products' });
// Product.belongsToMany(Recipe, { through: 'recipe_products' });

// Order.belongsToMany(Recipe, { through: 'order_recipes' });
// Recipe.belongsToMany(Order, { through: 'order_recipes' });

// Modifier.belongsTo(Order);
// Modifier.belongsTo(Recipe);
// Modifier.belongsTo(Product);

// Recipe.hasMany(Modifier);
// Order.hasMany(Modifier);
