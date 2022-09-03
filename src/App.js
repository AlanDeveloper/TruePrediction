import axios from 'axios';
import { useState } from 'react';
import './index.css';

function App() {
  
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(5);
  const [result, setResult] = useState([]);
  const [preview, setPreview] = useState();

  const searchCity = (e) => {
    e.preventDefault();

    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=${limit}&appid=cd167360712f9406b8262a06d1b7f628`).then(result => setResult(result.data));
  }

  const previewCity = (lat, lng) => {
    setName("");
    setResult([]);
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=cd167360712f9406b8262a06d1b7f628`).then(preview => setPreview(preview.data));
  }

  console.log(preview)

  return (
    <div className="App">
      {/* <header>
        <h2>.Tempo</h2>
      </header> */}
      <main>
        <img src="./map.svg" alt="map" />
        <div>
          <form onSubmit={searchCity}>
            <input type="text" onChange={e => setName(e.target.value)} value={name} placeholder="Procure pelo nome" />
            <input type="submit" value="Procurar" />
          </form>
          <div id="result">
            {result.map((city, index) => {
              return <div key={index} onClick={() => previewCity(city.lat, city.lon)} data-lat={city.lat} data-lng={city.lon}>
                <p>{city.name} - {city.state}</p>
              </div>;
            })}
          </div>
          {preview && (
            <div id="preview">
              <h3>{preview.city.name}</h3>
              {preview.list.map((day, index) => {
                return <div key={index}>
                  <p>Visibilidade: {day.visibility} m</p>
                  <p>data: {day.dt_txt}</p>
                  <p>Temperatura: {(day.main.temp - 32)/1.8}°</p>
                  <p>Temperatura máxima:{(day.main.temp_max - 32)/1.8}°</p>
                  <p>Temperatura mínima:{(day.main.temp_min - 32)/1.8}°</p>
                  <p>Pressão: {day.main.pressure} hPa</p>
                  <p>Humidade: {day.main.humidity}%</p>
                  <p>Velocidade do vento: {day.wind.speed}m/s</p>
                  <p>Precipitação: {day.pop ? 100 : 0}%</p>
                </div>
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
