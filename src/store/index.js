import React, { createContext, useContext, useReducer } from 'react';
import reducer from '../reducers';

export const initialState = {
    weather: null,
    latitude: 0.0,
    longitude: 0.0,
    city: "",
    error: null
};

export const StateContext = createContext(initialState);
const { Provider } = StateContext;

export const StateProvider = ({children}) => {
    return <Provider value={useReducer(reducer, initialState)}>{children}</Provider>;
};

export const useStateValue = () => useContext(StateContext);