import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import * as React from "react";

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
}));

export default function CameraCard(props) {
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

  return (
    <OutItem elevation={5}>
      <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>Camera</h2>
      <InItem>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Camera</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedRoom}
                label="Camera"
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
          <Grid item xs={12}>
            {deviceIdx !== -1 && props.devices[deviceIdx] && (
              <img
                width="100%"
                style={{ marginTop: "2vh", borderRadius: "20px" }}
                src={props.devices[deviceIdx].endpoint}
                alt="ERROR!"
              />
            )}
          </Grid>
        </Grid>
      </InItem>
    </OutItem>
  );
}

import PropTypes from "prop-types";

CameraCard.propTypes = {
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      room: PropTypes.string.isRequired,
      endpoint: PropTypes.string.isRequired,
    }),
  ).isRequired,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
