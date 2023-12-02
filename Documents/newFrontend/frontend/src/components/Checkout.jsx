import React from 'react';

function Checkout() {
  const handleCheckout = () => {
    // Retrieve confirmed selections from localStorage
    const storedSelections = localStorage.getItem('confirmedSelections');
    console.log("kadam                                   ",storedSelections)
    const recipes = storedSelections ? JSON.parse(storedSelections) : [];
    console.log("recipes," , recipes)
    let amount=0;
    for(let i=0; i<recipes.length; i++){
      amount += recipes[i].price;
      console.log(recipes[i].price)
      console.log("amount                                a",amount)
    }
    // Make a POST request to the API endpoint
    fetch('http://localhost:3000/placeOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipes, amount }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the API if needed
        console.log('API response:', data);
        // Clear localStorage after successful transfer
        localStorage.removeItem('confirmedSelections');
      })
      .catch(error => {
        // Handle errors if the API request fails
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <div className="text-center mt-2 justify-center m-4 bg-gray-300 rounded-2xl max-w-xs shadow-lg shadow-cyan-900 h-18">
        <button className="px-2 py-1 bg-gray-300 mr-5 font-semibold" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Checkout;
