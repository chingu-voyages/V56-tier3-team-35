import { checkAuth } from '../api/auth.api';
import React from "react";
import { Navigate } from "react-router-dom";
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);
  
  React.useEffect(() => {
    const chectAuthN = async () => {
      const auth = await checkAuth();
      setIsAuthenticated(auth);
    };
    chectAuthN();
  }, []);

  if (!isAuthenticated) {
     return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: 2,
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: "6rem", fontWeight: "bold", color: "error.main" }}
        >
          401
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Unauthorized - Please login to access this page
        </Typography>
        <Button component={Link} to="/login" variant="contained" size="large">
          Go to Login
        </Button>
      </Box>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};
