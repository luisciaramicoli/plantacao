import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id='contato'>
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Sua Empresa - Todos os direitos reservados.</p>
        
      </div>
    </footer>
  );
};

export default Footer;
