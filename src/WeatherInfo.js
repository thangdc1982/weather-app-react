import React from 'react';
import { useStateValue } from './store';

function WeatherInfo() {
    const [{weather}] = useStateValue();

    return weather && (
        <div className="weather-container">
            <div className="weather-icon">
              <img src={weather.iconId} alt={weather.description} />
              <div className="temprature-value">
                <p>{weather.temprature.value} *<span>C</span></p>
              </div>
              <div className="temprature-description">
                <p>{weather.description}</p>
              </div>
              <div className="location">
                <p>{weather.city}, {weather.country}</p>
              </div>
            </div>          
        </div>
    )
}

export default WeatherInfo;
