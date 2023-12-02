const { Order, Recipe, Modifier, Product } = require('../models/associations');
// const  Order  = require('../models/orderModel');
// const  Recipe  = require('../models/recipeModel');
// const  Product  = require('../models/productsModel');
// const  Modifier  = require('../models/modifierModel');

// Define Sequelize models (assuming you have already defined Product, Recipe, Order, and Modifier models)

// Define associations between models
// ...

// Controller to handle the order request
// const placeOrder = async (req, res) => {
//   try {
//     const { amount, recipes } = req.body;

//     // Create a new order
//     const order = await Order.create({ amount });
//     console.log(order);

//     // Process each recipe in the order
//     for (const recipeData of recipes) {
//       const { recipe_id, quantity, modifiers } = recipeData;

//       // Find the recipe
//       const recipe = await Recipe.findByPk(recipe_id);
//       if (!recipe) {
//         return res.status(404).json({ error: 'Recipe not found' });
//       } 
//       console.log(recipe);

//       // Associate the recipe with the order
//       await order.addRecipe(recipe, { through: { quantity } });

//       // Process modifiers for the recipe
//       for (const modifierData of modifiers) {
//         const { product_id, quantity: modifierQuantity } = modifierData;

//         // Find the product (modifier) and associate it with the recipe
//         const product = await Product.findByPk(product_id);
//         if (!product) {
//           return res.status(404).json({ error: 'Product not found' });
//         }

        
//             console.log("some : " , order.id)
        
//             console.log("some : " , recipe.id)
//         await Modifier.create({
//           quantity: modifierQuantity,
//           // orderId: order.id,
//           recipeId: recipe.id,
//           productId: product.id,
//         });
//       }   
//     }
//     console.log('________________________________');
//     // Fetch the order with associated recipes and modifiers
//     const responseOrder1 = await Order.findByPk(order.id);
//     console.log("p",responseOrder1.dataValues.id ,responseOrder1.dataValues.amount )
//     console.log("j", recipes[0].recipe_id)
//     // for()
//     const recipeId = await Recipe.findAll();
//     console.log("n" , recipeId)
//     console.log("pi",responseOrder1.dataValues.id ,responseOrder1.dataValues.amount )
//     for(let i=0;i<recipes; i++){
      
//     }
  
//     let data = 
//       {
//         Id: responseOrder1.dataValues.id , 
//         amt : responseOrder1.dataValues.amount,
//         recipes : [

//         ]
//     }

// return res.json(data)

    
//     const responseOrder = await Order.findByPk(order.id, {
//       include: [
//         {
//           model: Recipe,
//           include: [
//             {
//               model: Modifier,
//               include: Product,
//             },
//           ],
//         },
//       ],
//     });

//     // Send the response
//     res.json(responseOrder);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

const placeOrder= async (req, res) => {
  try {
    const { amount, recipes } = req.body;
    const order = await Order.create({ amount, recipes });
    console.log(order)
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};







const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Recipe,
          include: [
            Product,
            {
              model: Modifier,
              include: Product,
            },
          ],
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Add other order-related controllers as needed

module.exports = {
  getAllOrders,placeOrder
  // Add other exports as needed
};