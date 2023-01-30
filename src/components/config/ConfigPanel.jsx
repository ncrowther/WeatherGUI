import React, { useState } from "react";

import { Box, Tabs, Tab } from "@mui/material";
import WeatherConfig from "./WeatherConfig";

const ConfigPanel = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Weather" />
        </Tabs>
        {selectedTab === 0 && <WeatherConfig />}
      </Box>
    </Box>
  );
};

export default ConfigPanel;
