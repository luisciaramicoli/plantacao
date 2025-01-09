import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Sua Empresa - Todos os direitos reservados.</p>
        <div className="footer-links">
          <a href="/sobre">Sobre</a>
          <a href="/privacidade">Política de Privacidade</a>
          <a href="/contato">Contato</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
