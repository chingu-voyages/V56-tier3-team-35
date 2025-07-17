import { Add, FilterAltOutlined, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export const SurgeryDashboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentTime, setCurrentTime] = React.useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [priorityFilter, setPriorityFilter] = React.useState<string>("all");

  //time update automatically every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f8fafc, #e2e8f0)", // equivalent of bg-gradient-subtle
        padding: 6,
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: { lg: "space-between" },
            alignItems: { lg: "center" },
            gap: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(90deg, #3b82f6, #9333ea)", // mimicking bg-gradient-primary
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Surgery Status Dashboard
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "text.secondary", marginTop: 1 }}
            >
              {currentTime.toLocaleDateString()} •{" "}
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Add sx={{ fontSize: 16 }} />}
              sx={{
                backgroundColor: "#3B82F6",
                color: "#fff",
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              New Surgery
            </Button>
          </Box>
        </Box>
        {/*"filters and selects"*/}
        <Card
          sx={{ boxShadow: "gray", borderRadius: 3, border: "1px solid gray" }}
        >
          <CardHeader
            title={
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <FilterAltOutlined color="primary" fontSize="medium" />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Filters & Search
                </Typography>
              </Box>
            }
          />

          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                gap: 2,
                alignItems: "center",
              }}
            >
              {/* search input */}
              <Box
                sx={{
                  flex: 1,
                  border: "none",
                  position: "relative",
                  width: { xs: "100%" },
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search patients, procedures, or surgeons......"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{ backgroundColor: "#F9FAFB", borderRadius: 4 }}
                />
              </Box>
              {/* status filter */}
              <FormControl fullWidth sx={{ width: { xs: "100%", lg: 150 } }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "#F9FAFB",
                  }}
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="delayed">Delayed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>

              {/* priority filter */}
              <FormControl
                sx={{
                  width: { xs: "100%", lg: 150 },
                }}
              >
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priorityFilter}
                  label="Priority"
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "#F9FAFB",
                  }}
                >
                  <MenuItem value="all">All Priorities</MenuItem>
                  <MenuItem value="emergency">Emergency</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
