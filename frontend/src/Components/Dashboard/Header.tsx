import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box 
      component="header"
      sx={{
        borderBottom: '1px solid #e2e8f0',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        position: 'fixed',
        top: 0,
        right: 0,
        left: 200,
        zIndex: 1000,
        transition: 'left 0.3s'
      }}
    >
      <Box sx={{ display: 'flex', height: '56px', alignItems: 'center', px: 3 }}>
        <IconButton onClick={onToggleSidebar} sx={{ mr: 2, color: '#64748b' }}>
          <MenuIcon />
        </IconButton>
        
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Patient Management Dashboard
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: '0.875rem',
              color: '#64748b'
            }}
          >
            {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};