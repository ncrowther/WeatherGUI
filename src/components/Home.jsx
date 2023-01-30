import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import ConfigPanel from "./config/ConfigPanel";

const Home = () => {
  return (
    <Box flex={9} p={2}>
      <Paper sx={{ mt: 2, p: 2 }} elevation={4}>
        <Typography variant="h6">Endpoint Configuration</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Use these setting to configure your API endpoints.{" "}
        </Typography>
        <ConfigPanel />
      </Paper>
    </Box>
  );
};

export default Home;
