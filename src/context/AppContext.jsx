import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const DEFAULT_WEATHER_URL = "http://localhost:8123/WeatherAdvice";

const AppProvider = (props) => {
  const children = props.children;

  //Add app settings here

  const [weatherURL, setWeatherURL] = useState(DEFAULT_WEATHER_URL);

  const getDefaultWeatherURL = () => {
    return DEFAULT_WEATHER_URL;
  };

  return (
    <AppContext.Provider
      value={{
        weatherURL,
        setWeatherURL,
        getDefaultWeatherURL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
