import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slider from "@mui/material/Slider";
import CloseIcon from "@mui/icons-material/Close";
import { getCamImg } from "../API";
import CircularProgress from '@mui/material/CircularProgress';
import Slide from "@mui/material/Slide";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CameraDialog(props) {

  const [deviceIdx, setDeviceIdx] = React.useState(-1);

  React.useEffect(() => {
    let idx = props.devices.findIndex((device) => device.id === props.deviceID);
    setDeviceIdx(idx)
  }, [props.deviceID]);

  const [img, setImg] = React.useState(null);

  const interval = React.useRef(null)

  React.useEffect(() => {
    if (deviceIdx === -1) { return }

    if (props.devices[deviceIdx].type !== "Camera"){ return }

    if (props.devices[deviceIdx].on){
      interval.current = setInterval(() => {
        getCamImg(props.devices[deviceIdx].id).then(
          (res) => {
            setImg(res.data)
          },
          (error) => {
            console.log("ERROR!")
          }
        )
      }, 1000);
    }else{
      clearInterval(interval.current);
      interval.current = null;
    }

    return () => {
      clearInterval(interval.current);
    };

  }, [props.devices, deviceIdx]);

  if (deviceIdx === -1) { return }

  return (
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
        <Grid container spacing={2} align="center" sx={{ marginTop: "0.25vh" }}>
          <Grid item xs={12}>
            {props.devices[deviceIdx].on ? (
              <>
                { img === null ? 
                    <CircularProgress size="12vw" sx={{padding: "4vw"}} /> 
                  : 
                  <img
                    width="100%"
                    style={{ aspectRatio: "16/9", borderRadius: "10px" }}
                    src={`data:image/jpeg;base64,${img}`}
                    alt="Camera"
                  />
                }
              </>
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

