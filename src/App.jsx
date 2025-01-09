import React from 'react';
import './App.css';
import Dashboard from './components/dash/dash.jsx';
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx'; // Importando o Footer

function App() {
  return (
    <div className="app-container"> {/* Adicionando a classe app-container */}
      <Header />
   
      <main>
        <Dashboard />
      </main>
     
      <Footer /> {/* Rodapé será fixado na parte inferior */}
    </div>
  );
}

export default App;
