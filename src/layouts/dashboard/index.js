import React from "react";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/system";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <Stack direction={"row"}>
      <Sidebar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;