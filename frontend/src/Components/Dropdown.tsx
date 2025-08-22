import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteConfirmation from "./DeleteConfirmation";
import { Edit, Trash } from "lucide-react";
import { EditPatientModal } from "./Dashboard/EditPatientModal";
// import { Links } from "react-router-dom";

interface LongMenuProps {
  onDelete: () => void;
  onEdit: () => void;
}

export default function LongMenu({ onDelete }: LongMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showEditDialog, setShowEditDialog] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex items-center gap-2">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "long-button",
          },
        }}
      >
        <MenuItem onClick={() => {handleClose(); setShowEditDialog(true)}}><Edit className="mr-2 h-4 w-4"/> Edit</MenuItem>
        <MenuItem onClick={() => { handleClose(); setShowDeleteDialog(true); }} style={{color: "red"}}><Trash className="mr-2 h-4 w-4 text-red-500"/>Delete</MenuItem>
      </Menu>
      <DeleteConfirmation
        open={showDeleteDialog}
        handleClose={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          onDelete();
          setShowDeleteDialog(false);
        }}
      />
      <EditPatientModal
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
      />
    </div>
  )
}
