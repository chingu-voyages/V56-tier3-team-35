import React from "react";
import { Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Notification } from "./Components/ToastNotifications";
import Login from "./Pages/Login";
import { ProtectedRoute } from "./helper/CheckAuth";
import { Landing } from "./Pages/Landing";
import Waiting from "./Pages/Waiting";

// TanStack QueryClientProvider wraps the app to provide React Query context for caching, mutations, and queries
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Toast notifications and main dashboard UI */}
      <Notification />
      <BrowserRouter>
      <Box sx={{ minHeight: "100vh", width: "100%" }}>
        <Box component="main" sx={{ width: "100%" }}>
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/waiting-room" element={<Waiting />} />
            <Route path="/dashboard" element={
              // <ProtectedRoute>
              <Dashboard />
              // </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Box>
      </Box>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
