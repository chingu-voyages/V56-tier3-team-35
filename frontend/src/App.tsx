import React from "react";
import { Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./Pages/Dashboard";
import { Notification } from "./Components/ToastNotifications";

// TanStack QueryClientProvider wraps the app to provide React Query context for caching, mutations, and queries
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Toast notifications and main dashboard UI */}
      <Notification />
      <Box sx={{ minHeight: "100vh", width: "100%" }}>
        <Box component="main" sx={{ width: "100%" }}>
          <Dashboard />
        </Box>
      </Box>
    </QueryClientProvider>
  );
};

export default App;
