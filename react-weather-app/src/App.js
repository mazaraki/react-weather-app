import React, { useState } from "react";

import logo from "./logo.svg";
import keys from "./keys";
import "./App.css";

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

function App() {
  const dateBuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(4, 15);
    return date;
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (event) => {
    if (event.key === "ENTER") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((resp) => resp.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          console.log("result :>> ", result);
        });
    }
  };
  dateBuild();
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 18
            ? "App.hot"
            : "App.cold"
          : "App"
      }
    >
      <main>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-container">
              <div className="location">
                {weather.name} {weather.sys.country}
              </div>
              <div className="date">{dateBuild(new Date())}</div>
            </div>
            <div className="weather-container">
              <div className="temperature">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
