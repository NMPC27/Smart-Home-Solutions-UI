import * as React from "react";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import FlashOffIcon from "@mui/icons-material/FlashOff";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import LightsDialog from "./LightsDialog";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SettingsIcon from "@mui/icons-material/Settings";

const OutItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#111827",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#FFFFFF",
  borderRadius: "20px",
  height: 400
}));

const InItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "20px",
  minHeight: 280,
  maxHeight: 280, 
  overflow: "auto"
}));

export default function LightsCard(props) {
  const [deviceIdx, setDeviceIdx] = React.useState(() => {
    for (let i = 0; i < props.devices.length; i++) {
      if (props.devices[i].type === "Light") {
        return i;
      }
    }
    return -1;
  });

  const [selectedRoom, setSelectedRoom] = React.useState(() => {
    if (deviceIdx === -1) {
      return "All";
    } else {
      return props.devices[deviceIdx].room;
    }
  });

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = (e, idx) => {
    e.stopPropagation();
    setDeviceIdx(idx);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  React.useEffect(() => {
    if (props.globalRoom !== "Any") {
      setSelectedRoom(props.globalRoom);
    }
  }, [props.globalRoom]);

  return (
    <OutItem elevation={5}>
      <h2 style={{ marginTop: 10, marginBottom: 16 }}>Lights</h2>
        <InItem >
          <Grid container spacing={2.5} alignItems="center">
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Room</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedRoom}
                  label="Room"
                  onChange={(event) => setSelectedRoom(event.target.value)}
                >
                  <MenuItem key={0} value={"All"}>
                    {"All"}
                  </MenuItem>
                  {props.rooms.map((room, idx) => (
                    <MenuItem key={idx} value={room.name}>
                      {room.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {props.devices.map((val, idx) => {
              if (
                val.type === "Light" &&
                (val.room === selectedRoom || selectedRoom === "All")
              ) {
                return (
                  <>
                    <Grid item xs={2}>
                      <IconButton 
                        onClick={(e) => {
                          if (val.id.split(".")[0] === "light") {
                            handleOpenDialog(e, idx)
                          }
                        }}
                        disabled={ val.id.split(".")[0] !== "light" }
                      >
                        <SettingsIcon />
                      </IconButton>
                    </Grid>

                    <Grid item xs={7.5}>
                      <h3>{val.name}</h3>
                    </Grid>

                    <Grid item xs={2.5}>
                      <IconButton
                        onClick={() => props.handleLightOnOff(idx)}
                        sx={{
                          bgcolor: val.on && "#FFC107",
                          "&:hover": { bgcolor: val.on && "#D9A406" },
                        }}
                      >
                        {val.on ? <FlashOnIcon /> : <FlashOffIcon />}
                      </IconButton>
                    </Grid>
                  </>
                );
              }
            })}
          </Grid>
        </InItem>
      {props.devices[deviceIdx] !== undefined && (
        <LightsDialog
          openDialog={openDialog}
          deviceIdx={deviceIdx}
          devices={props.devices}
          handleCloseDialog={handleCloseDialog}
          handleLightColor={props.handleLightColor}
          handleBrightnessChange={props.handleBrightnessChange}
          handleLightOnOff={props.handleLightOnOff}
        />
      )}
    </OutItem>
  );
}
