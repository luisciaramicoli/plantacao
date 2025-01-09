// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./dash.css";

const Dashboard = () => {
  const [latitude, setLatitude] = useState("-23.5489");
  const [longitude, setLongitude] = useState("-46.6388");
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Mapeando a latitude e longitude
    const mapInstance = L.map("map").setView([latitude, longitude], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, [latitude, longitude]); // Dependências para atualizar o mapa quando as coordenadas mudarem

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const updateMapPosition = () => {
    if (map) {
      map.setView([latitude, longitude], 10);
    }
  };

  return (
    <div>
    

      <h2 className="titulo">Mapa</h2>
      <div className="inputs">
        <div>
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="number"
            id="latitude"
            value={latitude}
            onChange={handleLatitudeChange}
            step="any"
          />
        </div>
        <div>
          <label htmlFor="longitude">Longitude:</label>
          <input
            type="number"
            id="longitude"
            value={longitude}
            onChange={handleLongitudeChange}
            step="any"
          />
        </div>
        <button onClick={updateMapPosition}>Atualizar Mapa</button>
      </div>
    
      <div id="map" style={{ height: "400px", width: "100%" }} aria-label="Mapa Meteorológico"></div>
    
      <div id="sobre">
        <h1 className="titulo2">Sobre o Mapa Meteorológico</h1>
        <p className="texto">
          O Mapa Meteorológico é uma ferramenta interativa desenvolvida para fornecer informações e visualizações sobre
          condições geográficas e climáticas em tempo real. Utilizando tecnologia de mapeamento com o Leaflet, o sistema
          permite que os usuários insiram coordenadas de latitude e longitude, atualizando instantaneamente a visualização de
          locais específicos no mapa.
          <br />
          Esta plataforma é ideal para profissionais e entusiastas da área agrícola, geográfica ou ambiental, que precisam
          monitorar diferentes locais e suas condições meteorológicas com precisão. O Mapa Meteorológico oferece uma maneira
          prática de explorar e interagir com informações geoespaciais, fornecendo insights valiosos para tomada de decisões.
          <br />
          Se você precisa estudar o impacto das condições climáticas em áreas específicas ou planejar atividades ao ar
          livre, nosso mapa torna esses processos mais simples e acessíveis.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
