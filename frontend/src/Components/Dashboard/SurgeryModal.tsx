import { Add, Close } from '@mui/icons-material';
import { Dialog, Typography, DialogTitle, DialogContent, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Box, DialogActions, Button, Fab } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import React from 'react'


export const SurgeryModal = ({
    triggerButtonVariant = "button",
  triggerButtonText = "New Surgery",
}) => {
  const [open, setOpen] = React.useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("form sent");
  };

  const surgeons = [
    "Dr. Sarah Mitchell",
    "Dr. James Wilson",
    "Dr. Michael Thompson",
    "Dr. Anna Foster",
    "Dr. Robert Chen",
  ];

  const operatingRooms = ["OR-1", "OR-2", "OR-3", "OR-4", "OR-5", "OR-6"];

  const priorityOptions = [
    { value: "emergency", label: "🚨 Emergency", color: "#f44336" },
    { value: "high", label: "🔴 High Priority", color: "#ff9800" },
    { value: "medium", label: "🟡 Medium Priority", color: "#2196f3" },
    { value: "low", label: "🟢 Low Priority", color: "#4caf50" },
  ];

//  trigger button to open modal...Ai generated
  const renderTriggerButton = () => {
    if (triggerButtonVariant === "fab") {
      return (
        <Fab
          color="primary"
          aria-label="add surgery"
        //   onClick={open}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            "&:hover": {
              background: "linear-gradient(45deg, #1976D2 30%, #0288D1 90%)",
            },
          }}
        >
          <Add />
        </Fab>
      );
    }

    return (
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => setOpen(true)}
        sx={{
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          color: "white",
          fontWeight: 600,
          px: 3,
          py: 1.5,
          borderRadius: 2,
          textTransform: "none",
          boxShadow: "0 4px 14px 0 rgba(33, 150, 243, 0.3)",
          "&:hover": {
            background: "linear-gradient(45deg, #1976D2 30%, #0288D1 90%)",
            boxShadow: "0 6px 20px 0 rgba(33, 150, 243, 0.4)",
            transform: "translateY(-1px)",
          },
          transition: "all 0.2s ease-in-out",
        }}
      >
        {triggerButtonText}
      </Button>
    );
  };

  return (
    <>
      {renderTriggerButton()}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="md"
          fullWidth
          slotProps={{
            paper: {
              sx: {
                borderRadius: 3,
                maxHeight: "90vh",
              },
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "blue",
              mb: 2,
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                background: "linear-gradient(90deg, #3b82f6, #9333ea)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 600,
              }}
            >
              Schedule New Surgery
            </Typography>
            <Close
              onClick={() => setOpen(false)}
              sx={{
                color: "black",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            />
          </DialogTitle>

          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Add a new surgery to the schedule. All fields are required.
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Patient Name"
                    name="patientName"
                    required
                    variant="outlined"
                    />
                     </Grid>

                
                    {/* Procedure */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Procedure"
                    name="procedure"
                    required
                    variant="outlined"
                  />
                </Grid>

                {/* Surgoen and operating room */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel id="demo-simple-select-label">
                      Surgeon
                    </InputLabel>
                    <Select name="surgeon" label="Surgeon" value={"surgeon"}>
                      {surgeons.map((surgeon) => (
                        <MenuItem key={Math.random()} value={surgeon}>
                          {surgeon}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* operating room */}
                <Grid size={{ xs: 12, md: 6}}>
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-label">
                    Operating Room
                  </InputLabel>
                  <Select

                    name="operatingRoom"
                    label="Operating Room"
                    value={"operatingRoom"}
                  >
                    {operatingRooms.map((room) => (
                      <MenuItem key={Math.random()} value={room}>
                        {room}
                      </MenuItem>
                    ))}
                  </Select>
                  </FormControl>
                </Grid>

                {/* Date, Time, and Duration onchange and value to be added */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <DatePicker
                    label="Surgery Date"
                    //   value={}
                    onChange={() => console.log("date changed")}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="Start Time"
                    type="time"
                    required
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="Duration (hours)"
                    type="number"
                    value={""}
                    onChange={(e) => console.log(e.target.value)}
                    required
                    slotProps={{
                      htmlInput: {
                        min: 0.5,
                        max: 12,
                        step: 0.5,
                      },
                    }}
                    placeholder="2.5"
                  />
                </Grid>

                {/* address and email;  value and onchange to be added*/}
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={""}
                    onChange={(e) => console.log(e.target.value)}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={""}
                    onChange={(e) => console.log(e.target.value)}
                    required
                    variant="outlined"
                  />
                </Grid>

                {/* priority level value and onchange to be added */}
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth required>
                    <InputLabel>Priority Level</InputLabel>
                    <Select
                      name="priority"
                      value={""}
                      // onChange={}
                      label="Priority Level"
                    >
                      {priorityOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                backgroundColor: option.color,
                              }}
                            />
                            {option.label}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 3, gap: 2 }}>
              <Button
                onClick={() => setOpen(false)}
                variant="outlined"
                sx={{
                  minWidth: 120,
                  borderColor: "#e0e0e0",
                  color: "#666",
                  "&:hover": {
                    borderColor: "#bdbdbd",
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  minWidth: 120,
                  background:
                    "linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #388e3c 30%, #4caf50 90%)",
                  },
                }}
              >
                Schedule Surgery
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </LocalizationProvider>
    </>
  );
};
