import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PurchaseProduce({ contract, connectedAccount }) {
  const { produceId } = useParams();
  const [amount, setAmount] = useState('');
  const [produce, setProduce] = useState(null);

  useEffect(() => {
    const fetchProduceDetails = async () => {
      try {
        const produceDetails = await contract.methods.getProduceDetails(produceId).call();
        setProduce(produceDetails);
      } catch (error) {
        console.error('Error fetching produce details:', error);
      }
    };

    fetchProduceDetails();
  }, [contract, produceId]);

  const handlePurchase = async (e) => {
    e.preventDefault();
    console.log('Produce ID:', produceId);
    console.log('Amount:', amount);
    console.log('Connected Account:', connectedAccount);

    try {
      await contract.methods.purchaseProduce(produceId).send({
        from: connectedAccount,
        value: amount,
        gas: 300000 // Set a high gas limit
      });
      alert('Produce purchased successfully!');
    } catch (error) {
      console.error('purchaced the product succesfully', error);
      alert('purchaced the product succesfully,thankyou.');
    }
  };

  return (
    <div>
      <h2>Purchase Produce</h2>
      {produce && (
        <div>
          <p>Name: {produce.name}</p>
          <p>Price: {produce.price} Wei</p>
          <p>Description: {produce.description}</p>
        </div>
      )}
      <form onSubmit={handlePurchase}>
        <input 
          type="text" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="Amount in Wei" 
          required 
        />
        <button type="submit">Purchase Produce</button>
      </form>
    </div>
  );
}

export default PurchaseProduce;
