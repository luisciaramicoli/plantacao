import React from "react";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Minha Aplicação</h1>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item"><a href="#mapa">Mapa</a></li>
            <li className="nav-item"><a href="#sobre">Sobre</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
