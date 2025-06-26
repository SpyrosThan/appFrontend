import React from 'react';
import './CustomerList.css';

function Footer() {
  return (
    <footer className="text-center mt-4">
      <img src={require('./logo.png')} alt="Logo" className="footer-logo" />
    </footer>
  );
}

export default Footer;