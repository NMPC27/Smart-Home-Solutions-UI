import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function RoomDeleteConfirmation(props) {
  return (
    <Dialog
      open={props.openRoomDeleteConfirmation}
      onClose={() => props.handleCloseRoomDeleteConfirmation()}
      PaperProps={{ sx: { borderRadius: "20px" } }}
    >
      <DialogTitle bgcolor={"#E53935"} color={"#FFFFFF"}>
        <h3 style={{ marginTop: 0, marginBottom: 0 }}>
          Delete Room? - {props.rooms[props.deleteIdx].name}
        </h3>
        <IconButton
          onClick={() => props.handleCloseRoomDeleteConfirmation()}
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
        <h4>
          By deleting this room all the associated devices with this room will
          return to a "Not Assigned" room. Are you sure that you want to delete this room?
        </h4>
        <h4 style={{ color: "#FF0000" }}>
          Room to be deleted: {props.rooms[props.deleteIdx].name}
        </h4>
        <h4 style={{ color: "#FF0000", marginBottom: "1vh" }}>Devices to be modified:</h4>
        {props.devices.map((device, idx) => {
          if (device.room === props.rooms[props.deleteIdx].name) {
            return (
              <h4 key={idx} style={{ color: "#FF0000", marginLeft: "3vw", marginTop: "0vh", marginBottom: "0vh" }}>
                • {device.name}
              </h4>
            );
          }
        })}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => props.handleCloseRoomDeleteConfirmation()}
          sx={{ borderRadius: "20px", fontWeight: "bold", color: "#000000" }}
        >
          NO
        </Button>
        <Button
          onClick={() => props.handleCloseRoomDeleteConfirmationOK()}
          sx={{
            borderRadius: "20px",
            fontWeight: "bold",
            bgcolor: "#E53935",
            color: "#FFFFFF",
            "&:hover": { bgcolor: "#374151" },
          }}
        >
          YES
        </Button>
      </DialogActions>
    </Dialog>
  );
}

