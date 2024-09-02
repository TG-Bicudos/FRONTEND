import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useState } from 'react';
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css'; 
import DadosArmadilha from "../DadosArmadilha/DadosArmadilha";
import './Mapa.css'

function Mapa() {
  const marcadorTrap1 = [-21.931588, -50.5210539];
  const marcadorTrap2 = [-21.731588, -50.3210539];

  //icone da biblioteca bugado, configuração manual
  const iconeIOT = new Icon({ 
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const [dadosVisiveis, setVisibilidadeDados] = useState(false); 

  const exibirDados = () => {
    setVisibilidadeDados(true);
  };

  const ocultarDados = () => {
    setVisibilidadeDados(false);
  };

  return (
    <div className="mapa-container">
      <div className="mapa">
        <MapContainer center={marcadorTrap1} zoom={10} scrollWheelZoom={true} style={{ height: "93vh", width: "85vh" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
  
          <Marker 
            position={marcadorTrap1} 
            icon={iconeIOT} 
            eventHandlers={{
              click: exibirDados,
            }}>
            <Popup>Armadilha 1</Popup>
          </Marker>
          
          <Marker 
            position={marcadorTrap2} 
            icon={iconeIOT} 
            eventHandlers={{
              click: exibirDados,
            }}>
            <Popup>Armadilha 2</Popup>
          </Marker>
        </MapContainer>
      </div>
    <div>
        {dadosVisiveis && (
        <div className="dados">
          <DadosArmadilha ocultarDados={ocultarDados} />
        </div>
      )}
    </div>
    </div>
  );  
}

export default Mapa;
