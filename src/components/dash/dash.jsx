import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./dash.css";

const Dashboard = () => {
  const [latitude, setLatitude] = useState(-23.5489); // Latitude inicial
  const [longitude, setLongitude] = useState(-46.6388); // Longitude inicial
  const [address, setAddress] = useState("");
  const [marker, setMarker] = useState(null); // Armazenar o marcador
  const [distance, setDistance] = useState(null); // Armazenar a distância calculada

  const mapRef = useRef(null); // Usando um ref para armazenar a referência do mapa

  useEffect(() => {
    // Inicializa o mapa com a posição inicial
    mapRef.current = L.map("map").setView([latitude, longitude], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    // Adiciona marcador ao clicar no mapa
    mapRef.current.on('click', (e) => {
      const { lat, lng } = e.latlng;

      // Remove o marcador anterior se existir
      if (marker) {
        mapRef.current.removeLayer(marker);
      }

      // Adiciona o novo marcador
      const newMarker = L.marker([lat, lng]).addTo(mapRef.current)
        .bindPopup(`
          Latitude: ${lat}, Longitude: ${lng}<br>
          <button id="removeMarkerBtn">Remover Marcador</button>
        `)
        .openPopup();

      // Adiciona o evento para remover o marcador
      newMarker.on('popupopen', () => {
        // Atribui o evento de clique ao botão dentro do popup
        document.getElementById("removeMarkerBtn")?.addEventListener("click", () => {
          removeMarker(newMarker); // Remove o marcador ao clicar
        });
      });

      setMarker(newMarker);

      // Atualiza o endereço com as coordenadas do novo marcador
      updateAddress(lat, lng);

      // Calcula a distância entre o ponto atual e o ponto clicado
      const currentLocation = L.latLng(latitude, longitude);
      const clickedLocation = L.latLng(lat, lng);
      const dist = currentLocation.distanceTo(clickedLocation);
      setDistance(dist);
    });

    return () => {
      mapRef.current.remove();
    };
  }, [latitude, longitude]); // Apenas latitude e longitude como dependências

  const handleLatitudeChange = (event) => {
    setLatitude(parseFloat(event.target.value)); // Convertendo para número
    updateAddress(parseFloat(event.target.value), longitude);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(parseFloat(event.target.value)); // Convertendo para número
    updateAddress(latitude, parseFloat(event.target.value));
  };

  const updateMapPosition = () => {
    if (mapRef.current) {
      mapRef.current.setView([latitude, longitude], 10);

      // Remove o marcador anterior se existir
      if (marker) {
        mapRef.current.removeLayer(marker);
        setMarker(null); // Limpa o estado do marcador
      }

      // Adiciona o novo marcador
      const newMarker = L.marker([latitude, longitude]).addTo(mapRef.current).bindPopup(`Latitude: ${latitude}, Longitude: ${longitude}`).openPopup();
      setMarker(newMarker); // Atualiza o estado com o novo marcador
    }
  };

  const removeMarker = (markerToRemove) => {
    if (markerToRemove) {
      mapRef.current.removeLayer(markerToRemove); // Remove o marcador do mapa
      setMarker(null); // Limpa o estado do marcador
    }
  };

  const getAddressFromCoordinates = async (lat, lon) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
    const data = await response.json();
    return data.display_name;
  };

  const updateAddress = async (lat, lon) => {
    if (lat && lon) {
      const address = await getAddressFromCoordinates(lat, lon);
      setAddress(address);
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
        <button onClick={() => removeMarker(marker)}>Remover Marcador</button> {/* Botão para remover o marcador */}
      </div>

      <div className="endereco">
        <div className="titulos">Endereço:</div>
        <p>{address || "Clique no mapa para obter o endereço."}</p>
      </div>

      <div className="distance">
        <div className="titulos">Distância:</div>
        <p className="distance2">{distance !== null && distance < 1000 ? `Distância: ${distance.toFixed(2)} metros` : "Clique no mapa para calcular a distância."}</p>
        <p className="distance2">{distance !== null && distance >= 1000 ? `Distância: ${(distance / 1000).toFixed(2)} km` : "Clique no mapa para calcular a distância."}</p>
      </div>

      <div id="map" 
        style={{ 
          height: "500px", 
          width: "80%", 
          margin: "0 auto", 
          display: "block", 
          textAlign: "center" 
        }} 
        aria-label="Mapa Meteorológico">
      </div>

      <div className="sobre" id="sobre">
        <h2>Manual de Instruções</h2>
        <p>Bem-vindo ao manual de instruções! Aqui você encontrará um passo a passo para utilizar a aplicação.</p>

        <h3>1. Como Usar o Mapa</h3>
        <p>Para interagir com o mapa:</p>
        <ol>
          <li><strong>Clique no mapa:</strong> Ao clicar em qualquer ponto do mapa, um marcador será adicionado naquele local.</li>
          <li><strong>Alterar Coordenadas:</strong> Você pode inserir manualmente as coordenadas de latitude e longitude nos campos abaixo do mapa.</li>
          <li><strong>Atualizar Localização:</strong> Ao clicar no botão "Atualizar Mapa", o mapa irá se mover para as coordenadas inseridas e o marcador será posicionado nesse novo local.</li>
        </ol>

        <h3>2. Como Obter o Endereço</h3>
        <p>O endereço do ponto clicado será automaticamente atualizado abaixo do mapa. Você pode também obter um endereço ao inserir diretamente as coordenadas no formulário.</p>

        <h3>3. Calculando a Distância</h3>
        <p>A distância entre o ponto clicado no mapa e a posição inicial do mapa (que pode ser alterada manualmente) será exibida em metros.</p>

        <h3>4. Personalização</h3>
        <p>Este mapa utiliza a biblioteca Leaflet. Você pode customizar a aplicação alterando as configurações no código, como as coordenadas iniciais, o estilo do mapa e os ícones dos marcadores.</p>

        <h3>5. Dúvidas ou Problemas?</h3>
        <p>Se você encontrar problemas ou tiver dúvidas, entre em contato conosco através do email: <a href="mailto:support@exemplo.com">support@exemplo.com</a>.</p>
      </div>
    </div>
  );
};

export default Dashboard;
