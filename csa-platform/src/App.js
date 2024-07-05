import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterFarmer from "./components/RegisterFarmer.jsx";
import ListProduce from "./components/ListProduce.jsx";
import BecomeMember from "./components/BecomeMember.jsx";
import ViewProduce from "./components/ViewProduce.jsx";
import PurchaseProduce from "./components/PurchaseProduce.jsx";
import Login from "./components/Login.jsx";
import NavBar from "./components/NavBar.jsx";
import contract from './utils/contract';
import Web3 from 'web3';
import './App.css';

function App() {
  const [web3, setWeb3] = useState(null);
  const [connectedAccount, setConnectedAccount] = useState('');

  useEffect(() => {
    const connectToMetaMask = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWeb3(web3Instance);
          const accounts = await web3Instance.eth.getAccounts();
          setConnectedAccount(accounts[0]);
        } catch (error) {
          console.error('User denied account access');
        }
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    };

    connectToMetaMask();
  }, []);

  return (
    <div className="back">
      <Router>
        <NavBar connectedAccount={connectedAccount} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registerfarmer" element={<RegisterFarmer contract={contract} connectedAccount={connectedAccount} />} />
          <Route path="/listproduce" element={<ListProduce contract={contract} connectedAccount={connectedAccount} />} />
          <Route path="/becomemember" element={<BecomeMember contract={contract} connectedAccount={connectedAccount} />} />
          <Route path="/viewproduce" element={<ViewProduce contract={contract} connectedAccount={connectedAccount} />} />
          <Route path="/purchaseproduce/:produceId" element={<PurchaseProduce contract={contract} connectedAccount={connectedAccount} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
