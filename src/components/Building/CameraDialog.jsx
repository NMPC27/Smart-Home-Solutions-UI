import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slider from "@mui/material/Slider";
import CloseIcon from "@mui/icons-material/Close";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { HexColorPicker } from "react-colorful";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CameraDialog(props) {

  const [deviceIdx, setDeviceIdx] = React.useState(-1);

  React.useEffect(() => {
    let idx = props.devices.findIndex((device) => device.id === props.deviceID);
    setDeviceIdx(idx)
  }, [props.deviceID]);

  if (deviceIdx === -1) { return }

  return (
    <Dialog
      fullWidth
      maxWidth={"md"}
      open={props.openDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => props.handleCloseDialog()}
      PaperProps={{ sx: { borderRadius: "20px" } }}
    >
      <DialogTitle bgcolor={"#1F2937"} color={"#FFFFFF"}>
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
        <Grid container spacing={2} align="center" sx={{ marginTop: "0.25vh" }}>
          <Grid item xs={12}>
            {props.devices[deviceIdx].on ? (
              <iframe
                width="100%"
                style={{ aspectRatio: "16/9", borderRadius: "10px" }}
                src={props.devices[deviceIdx].endpoint + "?autoplay=1"}
                allow="fullscreen; autoplay;"
                frameBorder="0"
              ></iframe>
            ) : (
              <img
                width="50%"
                style={{ marginTop: "2vh", borderRadius: "20px" }}
                src={"no-video.png"}
                alt="ERROR!"
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <IconButton
              onClick={() => props.handleCameraOnOff(deviceIdx)}
              sx={{
                bgcolor: props.devices[deviceIdx].on
                  ? "#FFC107"
                  : "#DDDEDF",
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
  );
}

