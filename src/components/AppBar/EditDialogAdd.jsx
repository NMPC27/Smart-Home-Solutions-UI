import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const suportedDevices = ["Light", "Temperature", "Motion Sensor", "Camera", "Security"];

export default function EditDialogAdd(props) {
  const [selectedType, setSelectedType] = React.useState();
  const [openErrorMsg, setOpenErrorMsg] = React.useState(false); // Select a type and room

  const handleCloseEditDialogAddOK = () => {
    if (!selectedType) {
      setOpenErrorMsg(true);
      return;
    }

    props.handleCardAdd(props.device,props.selectedTab,selectedType);

    props.handleCloseEditDialogAdd();
  };

  return (
    <>
      <Dialog
        fullWidth
        open={props.openEditDialogAdd}
        onClose={() => props.handleCloseEditDialogAdd()}
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        <DialogTitle bgcolor={"#1F2937"} color={"#FFFFFF"}>
          <h3 style={{ marginTop: 0, marginBottom: 0 }}>Add Card</h3>
          <IconButton
            onClick={() => props.handleCloseEditDialogAdd()}
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
              color: "#FFFFFF",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <h4>Card Type:</h4>
          <FormControl fullWidth>
            <InputLabel id="type-device">Type</InputLabel>
            <Select
              labelId="type-device"
              id="type"
              value={selectedType}
              label="Type"
              onChange={(event) => setSelectedType(event.target.value)}
            >
              {suportedDevices.map((type, idx) => (
                <MenuItem key={idx} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => props.handleCloseEditDialogAdd()}
            sx={{ borderRadius: "20px", fontWeight: "bold", color: "#000000" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleCloseEditDialogAddOK()}
            sx={{
              borderRadius: "20px",
              fontWeight: "bold",
              bgcolor: "#1F2937",
              color: "#FFFFFF",
              "&:hover": { bgcolor: "#374151" },
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openErrorMsg}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason !== "clickaway") {
            setOpenErrorMsg(false);
          }
        }}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={(event, reason) => {
            if (reason !== "clickaway") {
              setOpenErrorMsg(false);
            }
          }}
        >
          Select a Type and Room!
        </Alert>
      </Snackbar>
    </>
  );
}

