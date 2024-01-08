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
import DeleteIcon from "@mui/icons-material/Delete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1F2937",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#FFFFFF",
  borderRadius: "20px",
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const tmp = [
  {
    id: 1,
    name: "Shelly 1238194",
  },
  {
    id: 2,
    name: "Shelly HSDF7234",
  },
  {
    id: 3,
    name: "Samsung Smart TV32",
  },
];

const suportedDevices = ["Light", "Temperature", "Motion Sensor", "Camera"];

export default function DeviceDialog(props) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchDevicesStatus, setSearchDevicesStatus] =
    React.useState("notStarted"); // notFound, searching, found, notStarted
  const [deviceName, setDeviceName] = React.useState();
  const [devicesFound, setDevicesFound] = React.useState([]);
  const [selectedDevice, setSelectedDevice] = React.useState();
  const [selectedType, setSelectedType] = React.useState();
  const [selectedRoom, setSelectedRoom] = React.useState();

  const [openErrorMsg1, setOpenErrorMsg1] = React.useState(false); // fill all the fields!
  const [openErrorMsg2, setOpenErrorMsg2] = React.useState(false); // no devices found!
  const [openSuccessMsg, setOpenSuccessMsg] = React.useState(false); // device addded

  const handleFindDevices = () => {
    setSearchDevicesStatus("searching");

    //! API call
    setTimeout(() => {
      let rand = Math.random();
      let tmpState;

      if (rand < 0.5) {
        tmpState = "found";
      } else {
        tmpState = "notFound";
      }

      setSearchDevicesStatus(tmpState);
      setDevicesFound(tmp);

      if (tmpState === "notFound") {
        setOpenErrorMsg2(true);
      }
    }, 3000);
    //!
  };

  const handleDeviceAdd = (device, deviceName, selectedType, selectedRoom) => {
    if (!device || !deviceName || !selectedType || !selectedRoom) {
      setOpenErrorMsg1(true);
      return;
    }

    props.handleDeviceAdd(device, deviceName, selectedType, selectedRoom);

    setOpenSuccessMsg(true);

    setSearchDevicesStatus("notStarted");
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
        <DialogTitle bgcolor={"#1F2937"} color={"#FFFFFF"}>
          <h3 style={{ marginTop: 0, marginBottom: 0 }}>Rooms</h3>

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
              <Stack spacing={2} alignItems="center" justifyContent="center">
                <h3>Add New Device:</h3>
                {searchDevicesStatus === "notStarted" && (
                  <Button
                    variant="contained"
                    sx={{ fontWeight: "bold" }}
                    onClick={() => handleFindDevices()}
                  >
                    Find Devices
                  </Button>
                )}
                {searchDevicesStatus === "searching" && <CircularProgress />}
                {searchDevicesStatus === "found" && (
                  <>
                    <TextField
                      onChange={(e) => setDeviceName(e.target.value)}
                      label="Device Name"
                      variant="outlined"
                    />
                    <FormControl fullWidth>
                      <InputLabel id="select-device">Device</InputLabel>
                      <Select
                        labelId="select-device"
                        id="Device"
                        value={selectedDevice}
                        label="Device"
                        onChange={(event) =>
                          setSelectedDevice(event.target.value)
                        }
                      >
                        {devicesFound.map((device, idx) => (
                          <MenuItem key={idx} value={idx}>
                            {device.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="type-device">Type</InputLabel>
                      <Select
                        labelId="type-device"
                        id="type"
                        value={selectedType}
                        label="Type"
                        onChange={(event) =>
                          setSelectedType(event.target.value)
                        }
                      >
                        {suportedDevices.map((type, idx) => (
                          <MenuItem key={idx} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="room-device">Room</InputLabel>
                      <Select
                        labelId="room-device"
                        id="room"
                        value={selectedRoom}
                        label="Room"
                        onChange={(event) =>
                          setSelectedRoom(event.target.value)
                        }
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
                      sx={{ fontWeight: "bold", width: "50%" }}
                      onClick={() =>
                        handleDeviceAdd(
                          devicesFound[selectedDevice],
                          deviceName,
                          selectedType,
                          selectedRoom,
                        )
                      }
                    >
                      + ADD
                    </Button>
                  </>
                )}
                {searchDevicesStatus === "notFound" && (
                  <>
                    <h3 style={{ color: "#FF0000" }}>No Devices Found!</h3>
                    <Button
                      variant="contained"
                      sx={{ fontWeight: "bold" }}
                      onClick={() => handleFindDevices()}
                    >
                      Find Devices
                    </Button>
                  </>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Stack spacing={2} maxHeight={"45vh"}>
                <h3>Devices:</h3>

                {props.devices.map((room, idx) => (
                  <Item key={idx}>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
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
                      <Grid item xs={4}>
                        <IconButton
                          onClick={() => props.handleDeleteDevice(idx)}
                          sx={{
                            color: "#FFFFFF",
                          }}
                        >
                          <DeleteIcon />
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
            setOpenErrorMsg1(false);
          }
        }}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={(event, reason) => {
            if (reason !== "clickaway") {
              setOpenErrorMsg1(false);
            }
          }}
        >
          Fill all the fields!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openErrorMsg2}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason !== "clickaway") {
            setOpenErrorMsg2(false);
          }
        }}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={(event, reason) => {
            if (reason !== "clickaway") {
              setOpenErrorMsg2(false);
            }
          }}
        >
          No devices found!
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
          Device added!
        </Alert>
      </Snackbar>
    </>
  );
}

import PropTypes from "prop-types";

DeviceDialog.propTypes = {
  openDeviceDialog: PropTypes.bool.isRequired,
  handleCloseDeviceDialog: PropTypes.func.isRequired,
  handleDeviceAdd: PropTypes.func.isRequired,
  handleDeleteDevice: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
