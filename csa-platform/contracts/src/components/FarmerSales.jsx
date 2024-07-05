import React from 'react';
import { useCartContext } from '../CartContext';

function FarmerSales() {
  const { state } = useCartContext();

  return (
    <div>
      <h2>Your Sales</h2>
      <ul>
        {state.farmerSales.map((sale, index) => (
          <li key={index}>{sale.member} purchased {sale.name} - {sale.amount} Wei</li>
        ))}
      </ul>
    </div>
  );
}

export default FarmerSales;
