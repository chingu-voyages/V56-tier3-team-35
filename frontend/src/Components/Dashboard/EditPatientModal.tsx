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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdatePatientApi } from '../../api/patient.api';
import { toast } from 'react-toastify';

interface EditPatientModalProps {
  open: boolean;
  onClose: () => void;
  patient: Patient
}

export const EditPatientModal: React.FC<EditPatientModalProps> = ({
  open,
  onClose,
  patient
}) => {
  // amazonq-ignore-next-line
  const [formData, setFormData] = React.useState<Partial<Patient>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const queryClient = useQueryClient();

  // Initialize form with patient data
  React.useEffect(() => {
    if (patient && open) {
      setFormData({
        first_name: patient.first_name,
        last_name: patient.last_name,
        street_address: patient.street_address,
        duration: patient.duration,
        procedure: patient.procedure,
        surgeon: patient.surgeon,
        room: patient.room,
        phone_number: patient.phone_number,
        contact_name: patient.contact_name,
        status: patient.status
      });
      setErrors({});
    }
  }, [patient, open]);

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<Patient>) => {
      return UpdatePatientApi(patient.id, data);
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast.success("Patient updated successfully");
      setFormData({});
      setErrors({});
      onClose();
    }, 
    onError: (error) => {
      // Safe error logging without exposing sensitive data
      console.error('Update patient error:', error instanceof Error ? error.message : 'Unknown error');
      toast.error("Error updating patient");
    }
  }) 

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.first_name?.trim()) {
      newErrors.first_name = 'First name is required';
    }
    if (!formData.last_name?.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the validation errors');
      return;
    }
    
    updateMutation.mutate(formData);
  };

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
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="First Name *"
                name='first_name'
                value={formData.first_name || ""}
                onChange={(e) => handleChange("first_name", e.target.value)}
                size="small"
                error={!!errors.first_name}
                placeholder="eg; John"
                helperText={errors.first_name}
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
                name='last_name'
                value={formData.last_name || ""}
                onChange={(e) => handleChange("last_name", e.target.value)}
                size="small"
                placeholder="eg; Doe"
                error={!!errors.last_name}
                helperText={errors.last_name}
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
                label="Procedure"
                name='procedure'
                value={formData.procedure || ""}
                onChange={(e) => handleChange("procedure", e.target.value)}
                size="small"
                placeholder="eg; Laparoscopic Appendectomy"
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
                label="Surgeon"
                name='surgeon'
                value={formData.surgeon || ""}
                onChange={(e) => handleChange("surgeon", e.target.value)}
                placeholder="eg; Dr. John Doe"
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
              <FormControl fullWidth size="small">
                <InputLabel>Room</InputLabel>
                <Select
                  value={formData.room || "ÓR-1"}
                  onChange={(e) => handleChange("room", e.target.value)}
                  label="Room"
                  sx={{
                    borderRadius: 2,
                  }}
                >
                  <MenuItem value="OR-1">OR-1</MenuItem>
                  <MenuItem value="OR-2">OR-2</MenuItem>
                  <MenuItem value="OR-3">OR-3</MenuItem>
                  <MenuItem value="OR-4">OR-4</MenuItem>
                  <MenuItem value="OR-5">OR-5</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Duration"
                type="number"
                name='duration'
                placeholder="eg; 2"
                variant="outlined"
                value={formData.duration || ""}
                onChange={(e) => handleChange("duration", e.target.value)}
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
                label="Contact Name"
                name="contact_name"
                value={formData.contact_name || ""}
                onChange={(e) => handleChange("contact_name", e.target.value)}
                size="small"
                placeholder="eg; Jane Doe"
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
                name="phone_number"
                value={formData.phone_number || ""}
                placeholder="eg; 123-456-7890"
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
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Address"
                name='street_Address'
                placeholder="eg; 123 Main St, City, State, Zip"
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
            disabled={updateMutation.isPending}
            sx={{
              backgroundColor: "#1da1f2",
              color: "white",
              textTransform: "none",
              borderRadius: "12px",
              paddingX: 3,
              paddingY: 1.2,
              "&:hover": {
                backgroundColor: "#1a91da",
              },
            }}
          >
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};