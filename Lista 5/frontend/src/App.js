import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    // Aqui vamos fazer a chamada ao backend para pegar as cidades
    axios.get('http://localhost:3001/cities')
      .then(response => {
        setCities(response.data);
      });
  }, []);

  const handleCityClick = (city) => {
    if (selectedCity === city) {
      setSelectedCity(null); // Esconde os detalhes se a cidade já está selecionada
    } else {
      setSelectedCity(city); // Mostra os detalhes da cidade clicada
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cidades</h1>
      </header>
      <main>
        <ul>
          {cities.map((city, index) => (
            <li key={index} onClick={() => handleCityClick(city)}>
              {city.name}
              {selectedCity === city && (
                <div>
                  <img src={city.img} alt={`${city.name}`} width={200} />
                  <p>{city.info}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
