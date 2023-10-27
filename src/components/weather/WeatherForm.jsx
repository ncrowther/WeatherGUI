import React, { useEffect, useState } from "react";
import { useWeatherContext } from "../../context/WeatherContext";

import {
  Box,
  Paper,
  Slider,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Unstable_Grid2";
import { TiWeatherSunny } from "react-icons/ti";
import { TiWeatherDownpour } from "react-icons/ti";
import { TiWeatherStormy } from "react-icons/ti";
import Checkbox from '@mui/material/Checkbox';

const DEFAULT_RAIN_FORECAST = 2.5;


const WeatherForm = () => {
  //local state for form inputs
  const [rainForecast, setRainForecast] = useState(DEFAULT_RAIN_FORECAST);
  const [temperature, setTemperature] = useState(800);

  //local state for Weather pre-qualification results

  const [advisory, setAdvisory] = useState("N/A");
  const [errors, setErrors] = useState({});

  //state & functions from WeatherContext
  const { getWeatherResult, WeatherResult } = useWeatherContext();

  const [stormAlert, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const rainMarks = [
    {
      value: 0,
      label: '0mm',
    },
    {
      value: 20,
      label: '20mm',
    },
    {
      value: 40,
      label: '40mm',
    },
    {
      value: 60,
      label: '60mm',
    },
    {
      value: 80,
      label: '80mm',
    },
    {
      value: 100,
      label: '100mm',
    }
  ];

  const tempMarks = [
    {
      value: 0,
      label: '0°C',
    },
    {
      value: 20,
      label: '20°C',
    },
    {
      value: 40,
      label: '40°C',
    },
    {
      value: 60,
      label: '60°C',
    },
    {
      value: 80,
      label: '80°C',
    },
    {
      value: 100,
      label: '100°C',
    }
  ];  

  useEffect(() => {
    const isEmpty = Object.keys(WeatherResult).length === 0;
    if (!isEmpty) {
      console.log("Weather Result updated.");

      var advisory
      if (WeatherResult == null) {
          advisory = "N/A"
      } else {
        advisory =  JSON.stringify(WeatherResult);
      }
      setAdvisory(advisory);
    }
  }, [WeatherResult]);

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  //form validation
  const validate = () => {
    //reset errors
    let temp = {};

    //check rainForecast
    if (!isNumeric(rainForecast) || rainForecast < 0 || rainForecast > 500) {
      console.log("checking rain forecast...")
      temp.rainForecast = "rainForecast must be between 0 and 500";
    }

    //check temperature
    if (!isNumeric(temperature) || temperature < 1 || temperature > 1000) {
      temp.temperature = "Temperature between 1-1000";
    }

    setErrors({ ...temp });

    //check every element in temp, to decide if validaiton was passed
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {

    console.log("Submitting...")

    if (validate()) {
      //create an object to hold all the data from the form

      console.log("Temp: " + temperature)
      var tempDesc = ""
      if (temperature < 20) {
        tempDesc = "cold"
      } else {
        tempDesc = "warm"
      }

      const payload =  {
        "Weather": {
          "rainForecast": parseInt(rainForecast),
          "stormAlert": stormAlert,
          "temperature": tempDesc
        },
        "Name": "Ned"
      }

      console.log(payload)

      //We don't get a payload back, this is handled asychronously
      //through usEffect hook. The hook will be called when the data
      //is updated.
      getWeatherResult(payload);
    }
  };

  const loadNiceWeatherPreset = (e) => {
    setRainForecast(0);
    setTemperature(70);
    setChecked(false);
  };
  const loadRainyWeatherPreset = (e) => {
    setRainForecast(100);
    setTemperature(50);
    setChecked(false);
  };

  const loadStormyWeatherPreset = (e) => {
    setRainForecast(100);
    setTemperature(70);
    setChecked(true);
  };

  //Set the background colour of the results area based on the
  //prequalificatio result
  let resultMood = "#EBF5FB";
  if (advisory.startsWith("Stay")) { 
    resultMood = "#E74C3C";
  }

  return (
    <Box flex={8} p={2}>
      <Paper sx={{ ml: 2, p: 4 }}>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h6" gutterBottom>
              Weather Details
            </Typography>
          </Grid>
          <Grid xs={6}>
          <IconButton onClick={() => loadNiceWeatherPreset()}>
              <TiWeatherSunny color="success" />
            </IconButton>            
            <IconButton onClick={() => loadRainyWeatherPreset()}>
              <TiWeatherDownpour color="warning" />
            </IconButton>
            <IconButton onClick={() => loadStormyWeatherPreset()}>
              <TiWeatherStormy color="error" />
            </IconButton>
          </Grid>
          <Grid xs={12}>
            <Typography gutterBottom>Rain Forecast</Typography>
            <Slider
              label="Rain Forecast"
              defaultValue={100}
              name="rainForecast"
              variant="outlined"
              valueLabelDisplay="on"
              marks={rainMarks}
              value={rainForecast}
              onChange={(e) => setRainForecast(e.target.value)}
              error={
                errors.rainforecast !== undefined &&
                errors.rainforecast.length > 0
              }
              helperText={errors.rainforecast}
            />
          </Grid>                    
          <Grid xs={12}>
            <Typography gutterBottom>Temperature</Typography>
            <Slider
              label="Temperature"
              defaultValue={70}
              name="temperature"
              variant="outlined"
              valueLabelDisplay="on"
              marks={tempMarks}
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              error={
                errors.temperature !== undefined &&
                errors.temperature.length > 0
              }
              helperText={errors.temperature}
            />
          </Grid>   
          <Grid xs={6}>
            <Typography gutterBottom>Storm Alert</Typography>
            <Checkbox
              checked={stormAlert}
              label="Storm Alert"
              name="stormAlert"
              onChange={handleChange}
              helperText={errors.stormAlert}
            />
          </Grid>                 
        </Grid>
        <Button
          variant="contained"
          onClick={() => handleSubmit()}
          endIcon={<SendIcon />}
          sx={{ mt: 5, mb: 5 }}
        >
          Get Weather
        </Button>
        <Box sx={{ p: 2 }} bgcolor={resultMood}>
          <Grid container spacing={1}>
            <Grid xs={6}>
              <Typography variant="h6" gutterBottom>
                Weather Response
              </Typography>
            </Grid>
            <Grid xs={6}></Grid>
            <Grid xs={6}>
              <Typography variant="body1">
                 {advisory}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default WeatherForm;
