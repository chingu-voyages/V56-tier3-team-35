import { Add, Close } from "@mui/icons-material";
// Removed react-hook-form and zodResolver, using only formData for state
import {
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  // Box,
  DialogActions,
  Button,
  Fab,
} from "@mui/material";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createNewPatientSchema } from "../../utils/validateInput";
import { createPatientApi } from "../../api/patient.api";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { toast } from "react-toastify";

export const SurgeryModal = ({
  triggerButtonVariant = "button",
  triggerButtonText = "New Surgery",
}) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const [formData, setFormData] = React.useState({
    first_name: "",
    last_name: "",
    street_address: "",
    city: "",
    postcode: "",
    region: "",
    country: "",
    phone_number: "",
    contact_email: "",
    status: "scheduled",
  });

  const createNewPatientMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return createPatientApi(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast.success("Patient created successfully");
      setOpen(false);
      setFormData({
        first_name: "",
        last_name: "",
        street_address: "",
        city: "",
        postcode: "",
        region: "",
        country: "",
        phone_number: "",
        contact_email: "",
        status: "scheduled",
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error creating patient");
    },
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validate with zod
    const result = createNewPatientSchema.safeParse(formData);
    if (!result.success) {
      // Show all validation errors in a toast
      toast.error('error creating Patient')
      return;
    }
    let last = parseInt(localStorage.getItem("lastPatientNumber") || "0", 10);
        last += 1;
    localStorage.setItem("lastPatientNumber", last.toString());

    const patientNumber = `P#${String(last).padStart(3, "0")}`;
    const newPatient = {
      ...formData,
      patient_number: patientNumber,
    };
    createNewPatientMutation.mutate(newPatient);
  };

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
                  label="First Name"
                  name="first_name"
                  required
                  variant="outlined"
                  value={formData.first_name}
                  onChange={(e) =>
                    handleInputChange("first_name", e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  required
                  variant="outlined"
                  value={formData.last_name}
                  onChange={(e) =>
                    handleInputChange("last_name", e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Street Address"
                  name="street_address"
                  required
                  variant="outlined"
                  value={formData.street_address}
                  onChange={(e) =>
                    handleInputChange("street_address", e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  required
                  variant="outlined"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Postcode"
                  name="postcode"
                  required
                  variant="outlined"
                  value={formData.postcode}
                  onChange={(e) =>
                    handleInputChange("postcode", e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Region"
                  name="region"
                  required
                  variant="outlined"
                  value={formData.region}
                  onChange={(e) => handleInputChange("region", e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  required
                  variant="outlined"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone_number"
                  required
                  variant="outlined"
                  value={formData.phone_number}
                  onChange={(e) =>
                    handleInputChange("phone_number", e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Contact Email"
                  name="contact_email"
                  type="email"
                  required
                  variant="outlined"
                  value={formData.contact_email}
                  onChange={(e) =>
                    handleInputChange("contact_email", e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                    label="Status"
                  >
                    <MenuItem value="scheduled">Scheduled</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
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
                background: "linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)",
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
    </>
  );
};
