import React, { useEffect } from 'react';
import './App.css';
import { useStateValue } from './store';
import Notification from './Notification';
import WeatherInfo from './WeatherInfo';
import CityInfo from './CityInfo';
import { getWeather, KEY, updateWeather } from './reducers';

function App() {
  const [{error}, dispatch] = useStateValue();  

  useEffect(() => {     
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {  
        let payload = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        dispatch({
          type: "SET_LOCATION",
          payload
        });
        let api = `http://api.openweathermap.org/data/2.5/weather?lat=${payload.latitude}&lon=${payload.longitude}&appid=${KEY}`;
        getWeather(api)
        .then((data) => {
          updateWeather(dispatch, data);          
        })
        .catch (e => {            
            dispatch({
              type: "SET_ERROR",
              payload: {
                error: e
              }
            });
        });                   
      }, (error) => {  
        dispatch({
          type: "SET_ERROR",
          payload: {
            error
          }
        });              
      });
    }
  }, []);  

  return (    
    <div className="app">      
      <CityInfo />
      {error && <Notification />}
      {!error && <WeatherInfo />}
    </div>
  );
}

export default App;
