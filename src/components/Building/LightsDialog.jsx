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
import { useDebounce } from "use-debounce";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LightsDialog(props) {
  const [lightColor, setLightColor] = React.useState(null);
  const [lightColorFinal] = useDebounce(lightColor, 1000);

  const [ brightness, setBrightness ] = React.useState(null);

  const handleLightColor = (val) => {
    setLightColor(val);
  };

  const [deviceIdx, setDeviceIdx] = React.useState(-1);

  React.useEffect(() => {
    let idx = props.devices.findIndex((device) => device.id === props.deviceID);
    setDeviceIdx(idx)
  }, [props.deviceID]);


  React.useEffect(() => {
    if (deviceIdx === -1) { return }

    setLightColor(props.devices[deviceIdx].color);
    setBrightness(props.devices[deviceIdx].brightness);
  }, [deviceIdx]);

  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    if (deviceIdx === -1) { return }

    if (loaded) {
      if (lightColorFinal == undefined) { return }
      props.handleLightColor(lightColorFinal, deviceIdx);
    } else {
      setLoaded(true);
    }
  }, [lightColorFinal]);

  React.useEffect(() => {
    if (deviceIdx === -1) { return }

    setLightColor(props.devices[deviceIdx].color);
    setBrightness(props.devices[deviceIdx].brightness);
  }, [props.devices]);

  if (deviceIdx === -1) { return }

  return (
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
          {props.devices[deviceIdx].name} Light
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
            <h3 style={{ marginTop: 0, marginBottom: 0, textAlign: "left" }}>
              Color
            </h3>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <HexColorPicker
              color={lightColor}
              onChange={(val) => handleLightColor(val)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box
              fullWidth
              height={"100%"}
              minHeight={"5vh"}
              bgcolor={lightColor}
              borderRadius={"10px"}
            />
          </Grid>
          <Grid item xs={12}>
            <h3 style={{ marginTop: 0, marginBottom: 0, textAlign: "left" }}>
              Brightness
            </h3>
          </Grid>
          <Grid item xs={12}>
            <Slider
              value={brightness}
              onChange={(_, val) => setBrightness(val)}
              onChangeCommitted={(_, val) =>
                props.handleBrightnessChange(val, deviceIdx)
              }
              valueLabelDisplay="auto"
              sx={{
                "& .MuiSlider-thumb": { bgcolor: "#FFC107" },
                "& .MuiSlider-rail": { color: "#D9A406" },
                "& .MuiSlider-track": { color: "#FFC107" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <IconButton
              onClick={() => props.handleLightOnOff(deviceIdx)}
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

