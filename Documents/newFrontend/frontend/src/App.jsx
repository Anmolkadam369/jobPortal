// App.js
import React from 'react';
import FoodItem from './components/FoodItem';
import Checkout from './components/Checkout';

const App = () => {
  const foodItems = [
    { recipe_id: 1, name: 'Pizza', image: 'https://th.bing.com/th/id/OIP.r66UTpTf5Kai2aza99WIiQHaHa?rs=1&pid=ImgDetMain', price: 100 },
    { recipe_id: 2, name: 'Burger', image: 'burger.jpg', price: 100 },
    { recipe_id: 3,  name: 'Noodles', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqG2i4Q3ePis0GuEe8p2FcewJ2eVMWqhi7hg&usqp=CAU', price: 100 },

  ];

  return (
    <div>
      <div className='mt-1 mr-0 ml-1 bg-cyan-900 text-cyan-50 h-20 p-1 rounded-lg'>
        <h1 className="text-center text-2xl font-semibold mt-3">Foody Corner</h1>
      </div>

      <div className='flex flex-wrap justify-center'>

        {foodItems.map((item, index) => (
          <FoodItem key={index} {...item} />
        ))}

        <div className='m-10 p-2 w-64 shadow-lg shadow-cyan-900 rounded-lg h-62'>
          <Checkout />
        </div>
      </div>
      
    </div>
  );
};
export default App;