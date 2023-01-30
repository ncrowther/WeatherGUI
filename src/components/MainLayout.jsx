import { Outlet } from "react-router-dom";
import React from "react";
import { Stack } from "@mui/material";
import MyAppBar from "./MyAppBar";
import Sidebar from "./Sidebar";

const MainLayout = ({ results, deleteResult }) => {
  return (
    <>
      <MyAppBar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Outlet />
      </Stack>
    </>
  );
};

export default MainLayout;
