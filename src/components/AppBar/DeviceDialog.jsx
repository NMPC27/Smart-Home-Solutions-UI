import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#111827",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#FFFFFF",
  borderRadius: "20px",
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeviceDialog(props) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [deviceType, setDeviceType] = React.useState("");
  const [deviceName, setDeviceName] = React.useState("");
  const [selectedRoom, setSelectedRoom] = React.useState(null);

  const [editIdx, setEditIdx] = React.useState(-1);

  const [openErrorMsg1, setOpenErrorMsg] = React.useState(false);
  const [openSuccessMsg, setOpenSuccessMsg] = React.useState(false); // device addded
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleEditDevice = (idx) => {
    setDeviceType(props.devices[idx].type);
    setDeviceName(props.devices[idx].name);
    setSelectedRoom(props.devices[idx].room);
    setEditIdx(idx);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      editDevice();
    }
  };

  const editDevice = () => {
    if (deviceName === "" || selectedRoom === null) {
      setErrorMsg("Please fill out all fields!");
      setOpenErrorMsg(true);
      return;
    }

    setEditIdx(-1);
    setOpenSuccessMsg(true);
    props.editDevice(editIdx, deviceName, selectedRoom);
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth={"md"}
        open={props.openDeviceDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => props.handleCloseDeviceDialog()}
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        <DialogTitle bgcolor={"#111827"} color={"#FFFFFF"}>
          <h3 style={{ marginTop: 0, marginBottom: 0 }}>Devices</h3>

          <IconButton
            onClick={() => props.handleCloseDeviceDialog()}
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
          <Grid
            container
            spacing={2}
            align="center"
            sx={{ marginTop: "0.25vh" }}
          >
            {!mobile && (
              <Grid item xs={12} sm={6} md={6} height={"50vh"}></Grid>
            )}
            <Grid item xs={12} sm={6} md={6} position={!mobile && "absolute"}>
              {editIdx === -1 ? (
                <h3> Choose a device to edit! </h3>
              ) : (
                <Stack spacing={2} alignItems="center" justifyContent="center">
                  <h3>Edit Device:</h3>
                  <TextField disabled label="Device Type" value={deviceType} />
                  <TextField
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    label="Device Name"
                    variant="outlined"
                  />
                  <FormControl fullWidth>
                    <InputLabel id="room-device">Room</InputLabel>
                    <Select
                      labelId="room-device"
                      id="room"
                      value={selectedRoom}
                      label="Room"
                      onChange={(event) => setSelectedRoom(event.target.value)}
                    >
                      {props.rooms.map((room, idx) => (
                        <MenuItem key={idx} value={room.name}>
                          {room.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    sx={{ fontWeight: "bold" }}
                    onClick={() => editDevice()}
                  >
                    Edit Device
                  </Button>
                </Stack>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Stack spacing={2} maxHeight={"45vh"}>
                <h3>Devices:</h3>

                {props.devices.map((room, idx) => (
                  <Item key={idx}>
                    <Grid container spacing={2}>
                      <Grid item xs={10}>
                        <h3
                          style={{
                            textAlign: "left",
                            marginTop: "1vh",
                            marginBottom: "1vh",
                            marginLeft: "0.5vw",
                          }}
                        >
                          {room.name}
                        </h3>
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton
                          onClick={() => handleEditDevice(idx)}
                          sx={{
                            color: "#FFFFFF",
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Item>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openErrorMsg1}
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
          {errorMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSuccessMsg}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason !== "clickaway") {
            setOpenSuccessMsg(false);
          }
        }}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClose={(event, reason) => {
            if (reason !== "clickaway") {
              setOpenSuccessMsg(false);
            }
          }}
        >
          Device edited!
        </Alert>
      </Snackbar>
    </>
  );
}

import PropTypes from "prop-types";

// PropTypes for DeviceDialog component
DeviceDialog.propTypes = {
  openDeviceDialog: PropTypes.bool.isRequired,
  handleCloseDeviceDialog: PropTypes.func.isRequired,
  rooms: PropTypes.array.isRequired,
  devices: PropTypes.array.isRequired,
  editDevice: PropTypes.func.isRequired,
};
