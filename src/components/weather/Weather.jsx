import React from "react";

import { WeatherProvider } from "../../context/WeatherContext";
import WeatherForm from "./WeatherForm";

const Weather = () => {
  return (
    <WeatherProvider>
      <WeatherForm />
    </WeatherProvider>
  );
};

export default Weather;
