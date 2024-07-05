import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/css/BecomeMember.css';

function BecomeMember({ contract, connectedAccount }) {
  const [name, setName] = useState('');
  const [isMember, setIsMember] = useState(false);
  const [memberName, setMemberName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contract.methods.becomeMember(name).send({ from: connectedAccount });
      alert('You are now a member!');
      setIsMember(true);
      setMemberName(name);
    } catch (error) {
      console.error('Error becoming a member:', error);
      alert('Error becoming a member. See console for details.');
    }
  };

  return (
    <div>
      {!isMember ? (
        <form className="become-member-form" onSubmit={handleSubmit}>
          <h2>Become a Member</h2>
          <input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <button className="form-button" type="submit">Become Member</button>
        </form>
      ) : (
        <div>
          <h2>Welcome, {memberName}!</h2>
          <p>You are now a member.</p>
          <Link to="/viewproduce"><button className='btn'>View Produce</button></Link>
        </div>
      )}
    </div>
  );
}

export default BecomeMember;
