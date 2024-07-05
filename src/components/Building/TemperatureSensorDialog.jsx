import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { getSensor } from "../API";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TemperatureSensorDialog(props) {
  const [deviceIdx, setDeviceIdx] = React.useState(-1);

  const [temperature, setTemperature] = React.useState(0);

  const [openErrorMsg, setOpenErrorMsg] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    let idx = props.devices.findIndex((device) => device.id === props.deviceID);

    if (idx === -1) {
      return;
    }
    setDeviceIdx(idx);
  }, [props.deviceID]);

  React.useEffect(() => {
    if (deviceIdx === -1) {
      return;
    }

    if (props.devices[deviceIdx].type !== "Temperature Sensor") {
      return;
    }

    getSensor(props.deviceID)
      .then((res) => {
        setTemperature(res.data);
      })
      .catch((error) => {
        if ("response" in error) {
          setErrorMsg("Error " + error.response.status);
          setOpenErrorMsg(true);
        }
      });

    const interval = setInterval(() => {
      getSensor(props.deviceID)
        .then((res) => {
          setTemperature(res.data);
        })
        .catch((error) => {
          if ("response" in error) {
            setErrorMsg("Error " + error.response.status);
            setOpenErrorMsg(true);
          }
        });
    }, 60000);

    return () => clearInterval(interval);
  }, [deviceIdx]);

  if (deviceIdx === -1) {
    return;
  }

  return (
    <>
      <Dialog
        fullWidth
        open={props.openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => props.handleCloseDialog()}
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        <DialogTitle bgcolor={"#111827"} color={"#FFFFFF"}>
          <h3 style={{ marginTop: 0, marginBottom: 0 }}>
            {props.devices[deviceIdx].name} Temperature Sensor
          </h3>

          <IconButton
            onClick={() => props.handleCloseDialog()}
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
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <h3>{props.devices[deviceIdx].name}</h3>
            </Grid>
            <Grid item xs={2}>
              <h3>{temperature}°C</h3>
            </Grid>
          </Grid>
        </DialogContent>
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
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

import PropTypes from "prop-types";

TemperatureSensorDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  deviceID: PropTypes.string.isRequired,
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
