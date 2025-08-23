import React from 'react'

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  IconButton,

} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Schedule as ScheduleIcon,
  People as PeopleIcon,
  MonitorHeart as MonitorIcon,
  ChevronLeft,
  ChevronRight,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {useMutation} from "@tanstack/react-query";
import { Logout } from '../../api/auth.api';
import {toast} from "react-toastify";
import { Heart } from 'lucide-react';

const items = [
  { title: "Dashboard", url: "/dashboard", icon: DashboardIcon },
  { title: "Waiting Room", url: "/waiting-room", icon: MonitorIcon },
  { title: "Surgery Schedule", url: "/schedule", icon: ScheduleIcon },
  { title: "Staff Directory", url: "/staff", icon: PeopleIcon },
];

export const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const location = useLocation();
  const drawerWidth = isCollapsed ? 60 : 200;
  const navigate = useNavigate();


  const logoutMutation = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      toast.success("Logout Successful")
      navigate("/login");
    },
    onError: () => {
      toast.error("Error logging out");
    },
  })
  const handleForm = () => {
    logoutMutation.mutate();
  };
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          transition: "width 0.3s",
          backgroundColor: "#f8fafc",
          borderRight: "1px solid #e2e8f0",
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <div className="flex  text-blue-400  gap-3 ">
          <Heart className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
          <h4 className="font-medium bg-clip-text">
            Surgery Update Board
          </h4>
        </div>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton onClick={() => setIsCollapsed(!isCollapsed)} size="small">
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>

      {!isCollapsed && (
        <Box sx={{ px: 2, py: 1 }}>
          <Typography
            variant="caption"
            sx={{ color: "#64748b", fontWeight: 500, fontSize: "0.7rem" }}
          >
            Navigation
          </Typography>
        </Box>
      )}

      <List>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.url

          return (
            <ListItem key={item.title} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.url}
                sx={{
                  minHeight: 48,
                  justifyContent: isCollapsed ? "center" : "initial",
                  mx: 1,
                  mb: 0.5,
                  borderRadius: 2,
                  backgroundColor: isActive ? "#3b82f6" : "transparent",
                  color: isActive ? "white" : "#64748b",
                  "&:hover": {
                    backgroundColor: isActive ? "#2563eb" : "#f1f5f9",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isCollapsed ? "auto" : 2,
                    justifyContent: "center",
                    color: isActive ? "white" : "#64748b",
                  }}
                >
                  <Icon />
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{ fontSize: "0.85rem" }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Box sx={{ mt: "auto", p: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleForm}
            sx={{
              minHeight: 48,
              justifyContent: isCollapsed ? "center" : "initial",
              mx: 1,
              mb: 0.5,
              borderRadius: 2,
              color: "#ef4444",
              "&:hover": {
                backgroundColor: "#fef2f2",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isCollapsed ? "auto" : 2,
                justifyContent: "center",
                color: "#ef4444",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            {!isCollapsed && (
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontSize: "0.85rem" }}
              />
            )}
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
}
