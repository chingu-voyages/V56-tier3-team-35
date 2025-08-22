import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Patient } from '../../types/types';

interface EditPatientModalProps {
  open: boolean;
  onClose: () => void;
}

export const EditPatientModal: React.FC<EditPatientModalProps> = ({
  open,
  onClose,

}) => {
  const [formData, setFormData] = React.useState<Partial<Patient>>({});

// //  React.useEffect(() => {
//     if (patient) {
//       setFormData(patient);
//     }
//   }, [patient]);

  const handleChange = (field: keyof Patient, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  // if (!patient) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            minHeight: 500,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Edit Patient Details
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="First Name *"
              value={formData.first_name || ""}
              onChange={(e) => handleChange("first_name", e.target.value)}
              size="small"
              slotProps={{
                input: {
                  sx: {
                    borderRadius: 2,
                  },
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Last Name *"
              value={formData.last_name || ""}
              onChange={(e) => handleChange("last_name", e.target.value)}
              size="small"
              slotProps={{
                input: {
                  sx: {
                    borderRadius: 2,
                  },
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              fullWidth
              label="Street Address"
              value={formData.street_address || ""}
              onChange={(e) => handleChange("street_address", e.target.value)}
              size="small"
              slotProps={{
                input: {
                  sx: {
                    borderRadius: 2,
                  },
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="City"
              value={formData.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
              size="small"
              slotProps={{
                input: {
                  sx: {
                    borderRadius: 2,
                  },
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Postcode"
              value={formData.postcode || ""}
              onChange={(e) => handleChange("postcode", e.target.value)}
              size="small"
              slotProps={{
                input: {
                  sx: {
                    borderRadius: 2,
                  },
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Region"
              value={formData.region || ""}
              onChange={(e) => handleChange("region", e.target.value)}
              size="small"
              slotProps={{
                input: {
                  sx: {
                    borderRadius: 2,
                  },
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Country"
              value={formData.country || ""}
              onChange={(e) => handleChange("country", e.target.value)}
              size="small"
              slotProps={{
                input: {
                  sx: {
                    borderRadius: 2,
                  },
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Phone Number"
              value={formData.phone_number || ""}
              onChange={(e) => handleChange("phone_number", e.target.value)}
              size="small"
              slotProps={{
                input: {
                  sx: {
                    borderRadius: 2,
                  },
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              fullWidth
              label="Email *"
              value={formData.contact_email || ""}
              onChange={(e) => handleChange("contact_email", e.target.value)}
              size="small"
              slotProps={{
                input: {
                  sx: {
                    borderRadius: 2,
                  },
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status || "scheduled"}
                onChange={(e) => handleChange("status", e.target.value)}
                label="Status"
                sx={{
                  borderRadius: 2,
                }}
              >
                <MenuItem value="scheduled">Scheduled</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="delayed">Delayed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            backgroundColor: "red",
            color: "white",
            textTransform: "none",
            // fontWeight: 600,
            borderRadius: "12px",
            border: 0,
            paddingX: 3,
            paddingY: 1.2,
            "&:hover": {
              opacity: 0.7,
            },
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#1da1f2",
            color: "white",
            textTransform: "none",
            // fontWeight: 600,
            borderRadius: "12px",
            paddingX: 3,
            paddingY: 1.2,
            "&:hover": {
              backgroundColor: "#1a91da",
            },
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};