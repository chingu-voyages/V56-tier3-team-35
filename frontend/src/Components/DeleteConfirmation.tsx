import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";

interface DeleteConfirmationProps {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmation({
  open,
  handleClose,
  onConfirm,
}: DeleteConfirmationProps) {
  const [inputValue, setInputValue] = React.useState("");
  const isValid = inputValue === "patient/delete";
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClose();
          },
          sx: { backgroundImage: "none", borderRadius: "1rem" },
        },
      }}
    >
      <DialogTitle sx={{color: "red"}}>Delete Patient</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          Type <strong>patient/delete</strong> to confirm deletion.
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="confirmation"
          name="confirmation"
          placeholder="patient/delete"
          value={inputValue}
          sx={{borderRadius: "1rem"}}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          variant="contained" 
          type="submit"
          disabled={!isValid}
          onClick={onConfirm}
          sx={{ 
            backgroundColor: isValid ? "#d32f2f !important" : undefined,
            borderRadius: "12px",
            color: "white",
            fontWeight: "bold",
            '&:hover': {
              backgroundColor: isValid ? "#b71c1c !important" : undefined
            }
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
