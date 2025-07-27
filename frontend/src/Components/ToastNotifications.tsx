import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";

export const Notification = () => {
  return (
    <Box className="">
      <ToastContainer position="bottom-right" />
    </Box>
  );
};
