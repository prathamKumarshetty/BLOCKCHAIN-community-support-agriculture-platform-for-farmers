import React from 'react';
import { Link } from 'react-router-dom';
import './css/Login.css'; // Adjusted the import path
import bc2 from './css/bc2.png'; // Adjusted the import path

function Login() {
  return (
    <div className="container">
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <Link to="/registerfarmer">
            <button className='btn'>Login as Farmer</button>
          </Link>
          <Link to="/becomemember">
            <button className='btn'>Login as Member</button>
          </Link>
        </div>
      </div>
      <div className="image-container">
        <img src={bc2} alt="CSA Info" />
      </div>
    </div>
  );
}

export default Login;
