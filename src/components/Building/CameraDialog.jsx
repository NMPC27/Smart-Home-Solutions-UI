import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { getCamImg } from "../API";
import CircularProgress from "@mui/material/CircularProgress";
import Slide from "@mui/material/Slide";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CameraDialog(props) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [deviceIdx, setDeviceIdx] = React.useState(-1);

  const [openErrorMsg, setOpenErrorMsg] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    let idx = props.devices.findIndex((device) => device.id === props.deviceID);
    setDeviceIdx(idx);
  }, [props.deviceID]);

  const [img, setImg] = React.useState(null);

  const interval = React.useRef(null);

  React.useEffect(() => {
    if (deviceIdx === -1) {
      return;
    }

    if (props.devices[deviceIdx].type !== "Camera") {
      return;
    }

    if (props.devices[deviceIdx].on) {
      interval.current = setInterval(() => {
        getCamImg(props.devices[deviceIdx].id)
          .then((res) => {
            setImg(res.data);
          })
          .catch((error) => {
            if ("response" in error) {
              setErrorMsg("Error " + error.response.status);
              setOpenErrorMsg(true);
            }
          });
      }, 1000);
    } else {
      clearInterval(interval.current);
      interval.current = null;
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [props.devices, deviceIdx]);

  if (deviceIdx === -1) {
    return;
  }

  return (
    <>
      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={props.openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => props.handleCloseDialog()}
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        <DialogTitle bgcolor={"#111827"} color={"#FFFFFF"}>
          <h3 style={{ marginTop: 0, marginBottom: 0 }}>
            {props.devices[deviceIdx].name} Camera
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
          <Grid
            container
            spacing={2}
            align="center"
            sx={{ marginTop: "0.25vh" }}
          >
            <Grid item xs={12}>
              {props.devices[deviceIdx].on ? (
                <>
                  {img === null ? (
                    <CircularProgress size="12vw" sx={{ padding: "4vw" }} />
                  ) : (
                    <img
                      width="100%"
                      style={{ aspectRatio: "16/9", borderRadius: "10px" }}
                      src={`data:image/jpeg;base64,${img}`}
                      alt="Camera"
                    />
                  )}
                </>
              ) : (
                <VideocamOffIcon
                  style={{
                    fontSize: mobile ? 180 : 340,
                    padding: mobile ? 5 : 35,
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <IconButton
                onClick={() => props.handleCameraOnOff(deviceIdx)}
                sx={{
                  bgcolor: props.devices[deviceIdx].on ? "#FFC107" : "#DDDEDF",
                  "&:hover": {
                    bgcolor: props.devices[deviceIdx].on
                      ? "#D9A406"
                      : "#B6B7B8",
                  },
                }}
              >
                <PowerSettingsNewIcon />
              </IconButton>
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

CameraDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["Camera"]).isRequired,
      on: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  deviceID: PropTypes.string.isRequired,
  handleCameraOnOff: PropTypes.func.isRequired,
};
