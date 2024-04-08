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
  minHeight: "32vh",
}));

export default function TemperatureSensorCard(props) {
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
      if (props.devices[i].type === "Temperature Sensor" || props.devices[i].type === "Humidity Sensor") {
        tmpSensors.push(props.devices[i]);
      }
    }

    setSensors([...tmpSensors]);

    const interval = setInterval(() => {
      
      for( let i = 0; i < tmpSensors.length; i++) {
        getSensor(tmpSensors[i].id).then((res) => {
          if (tmpSensors[i].type === "Temperature Sensor") {
            tmpSensors[i].currentTemperature = res.data;
          } else if (tmpSensors[i].type === "Humidity Sensor") {
            tmpSensors[i].currentHumidity = res.data;
          }
          setSensors([...tmpSensors]);
        });
      }

    }, 60000);

    return () => clearInterval(interval);
  }, [props.devices]);

  return (
    <OutItem elevation={5}>
      <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>Temperature Sensor</h2>
        <InItem style={{ maxHeight: "32vh", overflow: "auto" }}>
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

                return (
                  <>
                    <Grid item xs={9}>
                      <h3>{val.name}</h3>
                    </Grid>
                    <Grid item xs={3}>
                      { val.type === "Temperature Sensor" ? <h3>{val.currentTemperature}°C</h3> : <h3>{val.currentHumidity}%</h3> }
                    </Grid>
                  </>
                );

            })}
          </Grid>
        </InItem>
    </OutItem>
  );
}
