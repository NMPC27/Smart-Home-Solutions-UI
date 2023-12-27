import * as React from "react";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import LightsDialog from "./LightsDialog";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';

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


export default function LightsCard(props) {
  const [deviceIdx, setDeviceIdx] = React.useState(
    ()=> {
      for(let i=0;i<props.devices.length;i++){
        if (props.devices[i].type === "light"){
          return i
        }
      }
    }
  );

  const [selectedRoom, setSelectedRoom] = React.useState(() => props.devices[deviceIdx].room);

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = (e,idx) => {
    e.stopPropagation ();
    setDeviceIdx(idx);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <OutItem elevation={5}>
      <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>Lights</h2>
      <InItem>
        <Grid container spacing={4}>
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
                  <MenuItem key={0} value={"all"}>{"all"}</MenuItem>
                  {props.rooms.map((room, idx) => (
                    <MenuItem key={idx} value={room.name}>{room.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

          {props.devices.map((val, idx) => {
            if ( val.type === "light" && (val.room===selectedRoom || selectedRoom==="all")){
              return (
                <Grid item xs={12} key={idx} >
                  <Button 
                    fullWidth
                    startIcon={
                      <IconButton>
                        <LightbulbOutlinedIcon />
                      </IconButton>
                    }
                    endIcon={
                      <IconButton>
                        <SettingsIcon onClick={(e) => handleOpenDialog(e,idx)}/>
                      </IconButton>
                    }
                    sx={{
                      borderRadius: "10px",
                      bgcolor: val.on ? "#FFC107" : "#DDDEDF",
                      "&:hover": { bgcolor: val.on ? "#D9A406" : "#B6B7B8" },
                      color: val.on ? "#FFFFFF" : "#666666",
                      padding: "0.5vw",
                    }}
                    onClick={() => props.handleLightOnOff(idx)}                    
                  >

                    <b style={{width:"100%"}}>{val.name}</b>
                    
                  </Button>
                </Grid>
              );
            }
          })}
        </Grid>
      </InItem>
        <LightsDialog 
          openDialog={openDialog} 
          deviceIdx={deviceIdx}
          devices={props.devices}
          handleCloseDialog={handleCloseDialog}
          handleLightColor={props.handleLightColor}
          handleBrightnessChange={props.handleBrightnessChange}
          handleLightOnOff={props.handleLightOnOff}
        />
    </OutItem>
  );
}
