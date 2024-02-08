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

const OutItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1F2937",
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
  minHeight: "57vh",
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

  return (
    <OutItem elevation={5}>
      <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>Camera</h2>
      <InItem>
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
    </OutItem>
  );
}

import PropTypes from "prop-types";

CameraCard.propTypes = {
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      room: PropTypes.string,
      on: PropTypes.bool,
      endpoint: PropTypes.string,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
  globalRoom: PropTypes.string.isRequired,
  handleCameraOnOff: PropTypes.func.isRequired,
};
