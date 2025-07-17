
import { Box } from '@mui/material'
// import { SurgeryDashboard } from './Components/Dashboard/SurgeryDashboard'
import { Dashboard } from './Pages/Dashboard';
const App = () => {
  return (
        //  Tanstack query and react router to be added
    <Box sx={{ minHeight: "100vh", width: "100%" }}>
      <Box component="main" sx={{ width: "100%" }}>
        <Dashboard/>
      </Box>
    </Box>
  );
}

export default App