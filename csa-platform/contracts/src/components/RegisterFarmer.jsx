import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/RegisterFarmer.css';

function RegisterFarmer({ contract, connectedAccount }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [farmingPractices, setFarmingPractices] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contract.methods.registerAsFarmer(name, location, farmSize, farmingPractices).send({ from: connectedAccount });
      alert('Farmer registered successfully!');
      navigate('/listproduce');
    } catch (error) {
      console.error('Error registering farmer:', error);
      alert('Error registering farmer. See console for details.');
    }
  };

  return (
    <div className="form-container">
      <form className="register-farmer-form" onSubmit={handleSubmit}>
        <h2>Register Farmer</h2>
        <input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input className="form-input" type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
        <input className="form-input" type="text" value={farmSize} onChange={(e) => setFarmSize(e.target.value)} placeholder="Farm Size" required />
        <input className="form-input" type="text" value={farmingPractices} onChange={(e) => setFarmingPractices(e.target.value)} placeholder="Farming Practices" required />
        <button className="form-button" type="submit">Register Farmer</button>
      </form>
    </div>
  );
}

export default RegisterFarmer;
