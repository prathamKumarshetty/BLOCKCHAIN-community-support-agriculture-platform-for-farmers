import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/css/ViewProduce.css';

function ViewProduce({ contract }) {
  const [produceList, setProduceList] = useState([]);

  useEffect(() => {
    const fetchProduce = async () => {
      const produceCount = await contract.methods.produceCount().call();
      const produceArray = [];
      for (let i = 1; i <= produceCount; i++) {
        const produce = await contract.methods.getProduceDetails(i).call();
        produceArray.push(produce);
      }
      setProduceList(produceArray);
    };
    fetchProduce();
  }, [contract]);

  return (
    <div className="view-produce-container">
      <h2>View Produce</h2>
      <div className="produce-list">
        {produceList.map((produce, index) => (
          <div key={index} className="produce-item">
            <p><strong>Produce ID:</strong> {produce.produceId}</p>
            <p><strong>Name:</strong> {produce.name}</p>
            <p><strong>Description:</strong> {produce.description}</p>
            <p><strong>Planting Schedule:</strong> {produce.plantingSchedule}</p>
            <p><strong>Harvesting Schedule:</strong> {produce.harvestingSchedule}</p>
            <p><strong>Certifications:</strong> {produce.certifications}</p>
            <p><strong>Price:</strong> {produce.price}</p>
            <p><strong>Availability:</strong> {produce.availability ? 'Available' : 'Not Available'}</p>
            {produce.availability && (
              <Link to={`/purchaseproduce/${produce.produceId}`}>
                <button className="purchase-button">Purchase</button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewProduce;
