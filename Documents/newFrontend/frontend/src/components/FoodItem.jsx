import React, { useState, useEffect } from 'react';
import Checkout from './Checkout';

const FoodItem = ({ name, image, price, recipe_id, onCheckout }) => {
  const [quantity, setQuantity] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [addOnQuantity, setAddOnQuantity] = useState(1);
  const [selectionHistory, setSelectionHistory] = useState([]);
  const [confirmedSelections, setConfirmedSelections] = useState([]); // New state for confirmed selections
  let updatedSelections=[]
  const addOnOptions = [
    { name: 'Onion', price: 2, prod_id: 1 },
    { name: 'Cheese', price: 3, prod_id: 2 },
    { name: 'Tomato', price: 1, prod_id: 1 },
  ];

  const calculateTotalPrice = () => {
    console.log("selectaddons", selectedAddOns);
  
    let addOnsArray = selectedAddOns;
  
    // Convert selectedAddOns to an array if it's an object
    if (!Array.isArray(selectedAddOns)) {
      addOnsArray = Object.values(selectedAddOns);
    }
    console.log("addOnsArray              ",addOnsArray)
  
    const addOnsPrice = addOnsArray.reduce((total, addOn) => {
      // Find the add-on information based on the product_id
      console.log("addons                      "           , addOn.produc)
      const addOnInfo = addOnOptions.find((option) => option.prod_id == addOn.product_id);
      // Check if addOnInfo is defined before accessing its properties
      console.log("some           ", addOnInfo);
      if (addOnInfo) {
        let net = total + addOnInfo.price * addOn.quantity;
        console.log("mytotal", net);
        return net; // Return the updated total
      } else {
        return total;
      }
    }, 0);
  
    return quantity * price + addOnsPrice;
  };
  

  
  

  const handleAddOnChange = (event) => {
    const selectedOption = event.target.value;
  
    // Find the selected add-on based on the name
    const selectedAddOn = addOnOptions.find((option) => option.name === selectedOption);
  
    setAddOnQuantity(1);
  
    setSelectedAddOns((prevAddOns) => {
      const newAddOns = { ...prevAddOns };
  
      // Assuming selectedAddOn.prod_id is the product_id
      const addOnId = selectedAddOn.prod_id;
  
      if (newAddOns[addOnId] !== undefined) {
        // If the add-on already exists, update the quantity
        newAddOns[addOnId].quantity += 1;
      } else {
        // If the add-on doesn't exist, add it with quantity 1
        newAddOns[addOnId] = {
          product_id: addOnId,
          quantity: 1,
        };
      }
  
      return newAddOns;
    });
  };
  
  

  const handleAddOnQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10) || 1;
  
    const lastSelectedAddOn = Object.keys(selectedAddOns).pop();
  
    setSelectedAddOns((prevAddOns) => {
      const updatedAddOns = { ...prevAddOns };
      
      // Assuming lastSelectedAddOn is the product_id
      updatedAddOns[lastSelectedAddOn] = {
        product_id: lastSelectedAddOn,
        quantity: newQuantity,
      };
  
      return updatedAddOns;
    });
  
    setAddOnQuantity(newQuantity);
  };
  

  const handleAdd = () => {
    // Save the current selection to history
    setSelectionHistory((prevHistory) => [
      ...prevHistory,
      { quantity, selectedAddOns, addOnQuantity, price: calculateTotalPrice() },
    ]);

    setQuantity(quantity + 1);
  };

  const handleConfirm = () => {
    // Create a new confirmation object
    const newConfirmation = {
      recipe_id,
      quantity,
      selectedAddOns,
      addOnQuantity,
      price: calculateTotalPrice(),
      
    };
  
    // Get the current confirmed selections from local storage
    const storedSelections = localStorage.getItem('confirmedSelections');
    const currentSelections = storedSelections ? JSON.parse(storedSelections) : [];
  
    // Create a new array with the current confirmed selections and the new confirmation
    const updatedSelections = [...currentSelections, newConfirmation];
  
    // Save the updated confirmedSelections array to local storage
    localStorage.setItem('confirmedSelections', JSON.stringify(updatedSelections));
  
    // Update the state with the new array of confirmed selections
    setConfirmedSelections(updatedSelections);
  
    // Reset the current selection
    setSelectionHistory([]);
    setQuantity(0);
    setSelectedAddOns({});
    setAddOnQuantity(1);
  };
  
  
  
  useEffect(() => {
    const storedSelections = localStorage.getItem('confirmedSelections');
    if (storedSelections) {
      setConfirmedSelections(JSON.parse(storedSelections));
    }
    console.log(JSON.parse(storedSelections)); // Log the content of local storage
  }, []);
  
  

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
console.log(confirmedSelections)
  useEffect(() => {
    // Log current selection
    console.log({
      recipe_id,
      quantity,
      selectedAddOns,
      addOnQuantity,
      price: calculateTotalPrice(),
    });
  }, [quantity, selectedAddOns, addOnQuantity, price]);

  return (
    
    <div className="flex flex-col items-center w-1/4 p-4 mt-5">
      {/* Image in a circle with customized box shadow */}
      <div className="relative w-40 h-40 mb-2 mt-5">
        <div className="absolute w-full h-full rounded-full overflow-hidden shadow-2xl shadow-cyan-900">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>
  
      {/* Card for the item details */}
      <div className="border p-6 max-w-md text-center shadow-lg shadow-cyan-900 rounded-2xl relative z-10 w-60 h-100 bg-white">
        <h2 className="text-xl font-semibold mb-4">{name}</h2>
  
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-700 font-semibold mb-2">Original Price: ₹{price}</p>
          <p className="text-gray-700 font-semibold mb-4">Total Price: ₹{calculateTotalPrice()}</p>
  
          {/* Quantity Controls */}
          <div className="flex items-center justify-center mb-4">
            <button className="px-3 py-1 bg-gray-300 rounded-l-full font-semibold" onClick={handleRemove}>
              -
            </button>
            <span className="mx-4 font-semibold">{quantity}</span>
            <button className="px-3 py-1 bg-gray-300 rounded-r-full font-semibold" onClick={handleAdd}>
              +
            </button>
          </div>
  
          {/* Dropdown for Add-ons */}
          <div className="mb-4">
            <select
              id={`addOnDropdown-${name}`}
              className="mt-1 block w-full p-2 border rounded-md bg-gray-100"
              onChange={handleAddOnChange}
              disabled={quantity === 0}
            >
              <option value={null}>Select Add-on</option>
              {addOnOptions.map((option, index) => (
                <option key={index} value={option.name}>
                  {`${option.name} - ₹${option.price}`}
                </option>
              ))}
            </select>
          </div>
  
          {/* Display selected Add-ons with quantities */}
          {Object.keys(selectedAddOns).length > 0 && (
            <div className="mb-4">
              <p className="text-gray-700 font-semibold">
                {Object.entries(selectedAddOns).map(([addOn, addOnQuantity]) => (
                  <span key={addOn}>
                    {/* {`${addOn}-${addOnQuantity} `} */}
                  </span>
                ))}
              </p>
            </div>
          )}
  
          {/* Quantity for selected Add-on */}
          {Object.keys(selectedAddOns).length > 0 && (
            <div>
              <input
                id={`addOnQuantity-${name}`}
                type="number"
                min="1"
                value={addOnQuantity}
                onChange={handleAddOnQuantityChange}
                className="mt-1 block w-full p-2 border rounded-md bg-gray-100"
              />
            </div>
          )}
        </div>
        <button onClick={handleConfirm} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
          Confirm
        </button>
      </div>
      
     
    </div>
    
  );
  
        }
   export default FoodItem;