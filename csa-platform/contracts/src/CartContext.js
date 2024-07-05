import React, { createContext, useReducer, useContext } from 'react';

// Define the initial state of the cart
const initialState = {
  cart: [],
  sales: []
};

// Create the cart context
const CartContext = createContext();

// Define a reducer to handle cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'ADD_SALE':
      return { ...state, sales: [...state.sales, action.payload] };
    default:
      return state;
  }
};

// Create the cart context provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCartContext = () => {
  return useContext(CartContext);
};
