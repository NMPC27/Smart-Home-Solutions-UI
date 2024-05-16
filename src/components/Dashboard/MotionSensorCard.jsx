import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SensorsOffIcon from '@mui/icons-material/SensorsOff';
import SensorsIcon from '@mui/icons-material/Sensors';
import {getSensor} from "../API";

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

export default function MotionSensorCard(props) {
  const [selectedRoom, setSelectedRoom] = React.useState("All");

  const [sensors, setSensors] = React.useState([]);

  React.useEffect(() => {
    if (props.globalRoom !== "Any") {
      setSelectedRoom(props.globalRoom);
    }
  }, [props.globalRoom]);

  React.useEffect(() => {
    let tmpSensors = [];

    for(let i = 0; i < props.devices.length; i++) {
      if (props.devices[i].type === "Motion Sensor") {
        tmpSensors.push(props.devices[i]);
      }
    }

    const interval = setInterval(() => {
      
      for( let i = 0; i < tmpSensors.length; i++) {
        getSensor(tmpSensors[i].id).then((res) => {
          tmpSensors[i].detectedMotion = res.data;
          setSensors([...tmpSensors]);
        }).catch((error) => {
          if ("response" in error && error.response.status === 503) {
            setErrorMsg("503 Service Unavailable");
            setOpenErrorMsg(true);
          }
        })
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [props.devices]);

  return (
    <OutItem elevation={5}>
      <h2 style={{ marginTop: 10, marginBottom: 16 }}>Motion Sensor</h2>
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

            {sensors.map((val, idx) => {
                if (selectedRoom === "All" || selectedRoom === val.room) {
                  return (
                    <>
                      <Grid item xs={9}>
                        <h3>{val.name}</h3>
                      </Grid>
                      <Grid item xs={3}>
                        {val.detectedMotion === "on" ? <SensorsIcon /> : <SensorsOffIcon />}
                      </Grid>
                    </>
                  );
                }
            })}
          </Grid>
        </InItem>
    </OutItem>
  );
}
