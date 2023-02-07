import React, { useContext } from "react";
import axios from "axios";
import { useAppContext } from "./AppContext";

const WeatherContext = React.createContext();

const WeatherProvider = ({ children }) => {
  const [results, setResults] = React.useState([]);
  const [WeatherResult, setWeatherResult] = React.useState({});
  const { weatherURL, setWeatherURL, getDefaultWeatherURL } = useAppContext();

  const deleteResult = (index) => {
    let newResults = [...results];
    newResults.splice(index, 1);
    setResults(newResults);
  };

  const getWeatherResult = async (payload) => {
    
    console.log("Using Weather url " + weatherURL);
    try {
      let { data } = await axios.post(weatherURL, payload, {
        Accept: "application/json",
        "Content-Type": "application/json",
      });

      //Update state
      setWeatherResult(data);
      //Add the latest result to the results array, also add the request payload
      addWeatherResult(payload, data);
    } catch (error) {
      console.log("Error fetching Weather result, check URL and port in Home");
      console.log(error);
      //Update state
      let data = { "WeatherAdvice": JSON.stringify(error) }
      setWeatherResult(data);
      addWeatherResult(payload, data);
    }
  };

  const addWeatherResult = (payload, data) => {

    const payloadEmpty = Object.keys(payload).length === 0;
    const dataEmpty = Object.keys(data).length === 0;
    if (!dataEmpty && !payloadEmpty) {
      console.log("Weather Result being created.");
      var weatherAdvice = data["WeatherAdvice"];

      const result = {
        weatherAdvice,
      };
      //add the new result into a copy of the existing results
      let newResults = [...results];
      newResults.unshift(result);
      setResults(newResults);
    }
  };
  return (
    <WeatherContext.Provider
      value={{
        getWeatherResult,
        WeatherResult,
        deleteResult,
        results,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  return useContext(WeatherContext);
};

export { WeatherProvider };
