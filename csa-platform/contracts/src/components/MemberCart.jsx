import React from 'react';
import { useCartContext } from '../CartContext';

function MemberCart() {
  const { state, dispatch } = useCartContext();

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {state.memberCart.map((item, index) => (
          <li key={index}>{item.name} - {item.amount} Wei</li>
        ))}
      </ul>
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
}

export default MemberCart;
