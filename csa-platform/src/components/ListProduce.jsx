import React, { useState } from 'react';
import './css/ListProduce.css';
function ListProduce({ contract, connectedAccount }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [plantingSchedule, setPlantingSchedule] = useState('');
  const [harvestingSchedule, setHarvestingSchedule] = useState('');
  const [certifications, setCertifications] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contract.methods.listProduce(name, description, plantingSchedule, harvestingSchedule, certifications, price).send({ from: connectedAccount });
      alert('Produce listed successfully!');
    } catch (error) {
      console.error('Error listing produce:', error);
      alert('Error listing produce. See console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>List Produce</h2>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name" 
        required 
      />
      <input 
        type="text" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" 
        required 
      />
      <input 
        type="text" 
        value={plantingSchedule} 
        onChange={(e) => setPlantingSchedule(e.target.value)} 
        placeholder="Planting Schedule" 
        required 
      />
      <input 
        type="text" 
        value={harvestingSchedule} 
        onChange={(e) => setHarvestingSchedule(e.target.value)} 
        placeholder="Harvesting Schedule" 
        required 
      />
      <input 
        type="text" 
        value={certifications} 
        onChange={(e) => setCertifications(e.target.value)} 
        placeholder="Certifications" 
        required 
      />
      <input 
        type="text" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
        placeholder="Price in Wei" 
        required 
      />
      <button type="submit">List Produce</button>
    </form>
  );
}

export default ListProduce;
