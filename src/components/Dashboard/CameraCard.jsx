import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { getCamImg } from "../API";
import CircularProgress from '@mui/material/CircularProgress';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CameraDialog from "./CameraDialog";
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const OutItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#111827",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#FFFFFF",
  borderRadius: "20px",
}));

const InItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "20px",
}));

export default function CameraCard(props) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [deviceIdx, setDeviceIdx] = React.useState(() => {
    for (let i = 0; i < props.devices.length; i++) {
      if (props.devices[i].type === "Camera") {
        return i;
      }
    }
    return -1;
  });

  const [selectedRoom, setSelectedRoom] = React.useState(() => {
    if (deviceIdx === -1) {
      return null;
    } else {
      return props.devices[deviceIdx].room;
    }
  });

  const handleRoomChange = (val) => {
    setSelectedRoom(val);

    for (let i = 0; i < props.devices.length; i++) {
      if (props.devices[i].type === "Camera" && props.devices[i].room === val) {
        setDeviceIdx(i);
        return;
      }
    }

    setDeviceIdx(-1);
  };

  React.useEffect(() => {
    for (let i = 0; i < props.devices.length; i++) {
      if (
        props.devices[i].type === "Camera" &&
        props.devices[i].room === selectedRoom
      ) {
        setDeviceIdx(i);
        return;
      }
    }
    setDeviceIdx(-1);
  }, [props.devices]);

  React.useEffect(() => {
    if (props.globalRoom !== "Any") {
      handleRoomChange(props.globalRoom);
    }
  }, [props.globalRoom]);

  const [img, setImg] = React.useState(null);

  const interval = React.useRef(null)

  React.useEffect(() => {
    if (deviceIdx === -1) { return }

    if (props.devices[deviceIdx].on){
      interval.current = setInterval(() => {
        getCamImg(props.devices[deviceIdx].id).then(
          (res) => {
            setImg(res.data)
          }
        ).catch((error) => {
          if ("response" in error) {
            setErrorMsg(error.response.status+" "+error.response.data.detail);
            setOpenErrorMsg(true);
          }
        })
      }, 1000);
    }else{
      clearInterval(interval.current);
      interval.current = null;
    }

    return () => {
      clearInterval(interval.current);
    };

  }, [props.devices, deviceIdx]);

  const [fullScreen, setFullScreen] = React.useState(false);

  return (
    <OutItem elevation={5} sx={{  height: mobile ? 400 : 640 }}>
      <h2 style={{ marginTop: 10, marginBottom: 16 }}>Camera</h2>
      <InItem sx={{  minHeight: mobile ? 280 : 520, maxHeight: mobile ? 280 : 520 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Room</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedRoom}
                label="Room"
                onChange={(event) => handleRoomChange(event.target.value)}
              >
                {props.rooms.map((room, idx) => {
                  return (
                    <MenuItem key={idx} value={room.name}>
                      {room.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          {deviceIdx !== -1 && props.devices[deviceIdx] && (
            <>
              <Grid item xs={12}>
                {props.devices[deviceIdx].on ? (
                  <>
                    { img === null ? 
                        <CircularProgress size={mobile ? 110 : 250} sx={{padding: mobile ? 5 : 10}} /> 
                      : 
                      <div style={{position: "relative"}} >
                        <img
                          width="100%"
                          height={mobile ? 190 : 400}
                          style={{ borderRadius: "10px" }}
                          src={`data:image/jpeg;base64,${img}`}
                          alt="Camera"
                        />
                        <IconButton 
                            onClick={() => setFullScreen(true)} 
                            sx={{position: "absolute", right: 5, bottom: 10, color: "#FFFFFF", bgcolor: "#000000"}}                            
                          >
                            <FullscreenIcon sx={{ fontSize: 30 }} />
                          </IconButton>
                      </div>
                    }
                  </>
                ) : (
                  <VideocamOffIcon style={{fontSize: mobile ? 180 : 340, padding: mobile ? 5 : 35}}/>
                )}
              </Grid>

              {!mobile && <Grid item xs={5.5}></Grid>}

              <Grid item xs={1}>
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
              <Grid item xs={!mobile ? 5.5 : 11}>
                <h3 style={{ marginBottom: 0, marginTop: "1vh" }}>
                  Camera: {props.devices[deviceIdx].name}
                </h3>
              </Grid>
            </>
          )}
        </Grid>
      </InItem>
      {deviceIdx !== -1 && props.devices[deviceIdx] && (
        <CameraDialog
          openDialog={fullScreen}
          handleCloseDialog={() => setFullScreen(false)}
          fullImg={img}
          name={props.devices[deviceIdx].name}
        />
      )}
    </OutItem>
  );
}
