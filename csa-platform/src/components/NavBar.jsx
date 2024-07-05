import React from 'react';
import { Link } from "react-router-dom";
import '../components/css/NavBar.css';

function NavBar({ connectedAccount }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">CSA Platform</div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/registerfarmer" className="nav-link">Register Farmer</Link>
        </li>
        <li className="nav-item">
          <Link to="/listproduce" className="nav-link">List Produce</Link>
        </li>
        <li className="nav-item">
          <Link to="/becomemember" className="nav-link">Become Member</Link>
        </li>
        <li className="nav-item">
          <Link to="/viewproduce" className="nav-link">View Produce</Link>
        </li>
        <li className="nav-item">
          <Link to="/purchaseproduce" className="nav-link">Purchase Produce</Link>
        </li>
      </ul>
      <div className="navbar-account">Connected Account: {connectedAccount}</div>
    </nav>
  );
}

export default NavBar;
