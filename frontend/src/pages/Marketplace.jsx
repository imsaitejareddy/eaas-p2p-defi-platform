import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import EnergyCreditABI from '../contracts/EnergyCreditABI.json';
import MarketplaceABI from '../contracts/MarketplaceABI.json';
import { ENERGY_CREDIT_ADDRESS, MARKETPLACE_ADDRESS } from '../contracts/config';

const Marketplace = () => {
  const [offers, setOffers] = useState([]);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);

  // Fetch offers from backend
  useEffect(() => {
    async function fetchOffers() {
      const res = await axios.get('http://localhost:8080/offers');
      setOffers(res.data);
    }
    fetchOffers();
  }, []);

  // Connect wallet and get token balance
  async function connectWallet() {
    if (!window.ethereum) {
      alert('Please install MetaMask');
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const [addr] = await provider.send('eth_requestAccounts', []);
    setAccount(addr);
    const signer = await provider.getSigner();
    const token = new ethers.Contract(ENERGY_CREDIT_ADDRESS, EnergyCreditABI, signer);
    const bal = await token.balanceOf(addr);
    setBalance(parseFloat(ethers.formatUnits(bal, 18)));
  }

  // Buy offer
  async function buyOffer(offerId, price) {
    if (!window.ethereum) {
      alert('Please install MetaMask');
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const marketplace = new ethers.Contract(MARKETPLACE_ADDRESS, MarketplaceABI, signer);
    // send transaction with ETH equal to price
    const tx = await marketplace.buy(offerId, { value: price });
    await tx.wait();
    alert('Purchase completed');
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Marketplace</h1>
      {account ? (
        <p>Your address: {account} — Balance: {balance} EC</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
      <ul>
        {offers.map((offer) => (
          <li key={offer.id}>
            {offer.amount} EC for {offer.priceWei} wei (seller: {offer.seller.wallet}){' '}
            {offer && (
              <button
                onClick={() => buyOffer(offer.id, offer.priceWei)}
                disabled={!account}
              >
                Buy
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Marketplace;
