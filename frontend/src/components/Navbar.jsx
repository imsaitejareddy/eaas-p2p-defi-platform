import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
      <Link to="/">Dashboard</Link> |{' '}
      <Link to="/market">Marketplace</Link> |{' '}
      <Link to="/defi">DeFi</Link> |{' '}
      <Link to="/chat">Chat</Link>
    </nav>
  );
};

export default Navbar;
