import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Marketplace = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function fetchOffers() {
      const res = await axios.get('http://localhost:8080/offers');
      setOffers(res.data);
    }
    fetchOffers();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Marketplace</h1>
      <ul>
        {offers.map((offer) => (
          <li key={offer.id}>
            {offer.amount} EC for {offer.priceWei} wei (seller: {offer.seller.wallet})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Marketplace;
