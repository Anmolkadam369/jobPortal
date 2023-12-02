const { Modifier, Order, Recipe, Product } = require('../models/modifierModel');

const getAllModifiers = async (req, res) => {
  try {
    const modifiers = await Modifier.findAll({
      include: [
        Order,
        {
          model: Recipe,
          include: Product,
        },
      ],
    });
    res.json(modifiers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Add other modifier-related controllers as needed

module.exports = {
  getAllModifiers,
  // Add other exports as needed
};