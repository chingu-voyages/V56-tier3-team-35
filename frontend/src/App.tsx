import React from 'react'
import { Box} from '@mui/material'
import Dashboard from './Pages/Dashboard';

const App = () => {
  return (
    <Box sx={{ minHeight: "100vh", width: "100%" }}>
      <Box component="main" sx={{ width: "100%" }}>
        <Dashboard/>
      </Box>
    </Box>
  );
}

export default App