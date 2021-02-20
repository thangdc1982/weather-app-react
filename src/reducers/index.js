export const getWeather = async (api) => {
    const response = await fetch(api);
    if (!response.ok) {
        // throw an error if response has not successed
      throw new Error(`${response.status}, ${response.statusText}`);
    } else {
        return await response.json();
    }
}

export const updateWeather = (dispatch, data) => {
    let weather = {};
    weather.temprature = {
        unit: "celsius"
    };
    weather.temprature.value = Math.floor(data.main.temp - KELVIN);
    weather.description = data.weather[0].description;
    weather.iconId = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weather.city = data.name;
    weather.country = data.sys.country;          
    

    dispatch({
        type: "UPDATE_WEATHER",
        payload: weather
    });
};

export const KEY = "2a0ec0fcc813304aeef170a055160c55";

export const KELVIN = 273;

const reducer = (state, action) => {
    const { type, payload } = action;        
    switch (type) {                     
        case "SET_ERROR": 
            return {
                ...state,
                error: payload.error,
                city: payload.city,
                weather: null
            };
        case "SET_LOCATION":
            return {
                ...state,
                latitude: payload.latitude,
                longitude: payload.longitude
            };
        case "UPDATE_WEATHER":
            return {
                ...state,                
                weather: payload,
                error: null,
                city: payload.city
            };
        default:
            return state;
    }
};

export default reducer;