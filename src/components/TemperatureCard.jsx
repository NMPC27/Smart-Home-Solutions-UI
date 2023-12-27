import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import * as React from "react";
import CircularSlider from "react-circular-slider-svg";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

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

const colorsArray = [
  "#01579B",  
  "#0288D1",
  "#03A9F4",
  "#4FC3F7",
  "#B3E5FC",
  "#FFF176",
  "#FFEB3B",
  "#FBC02D",
  "#FFB74D",
  "#FF9800",
  "#F57C00",
  "#E65100",
  "#FF5722",
  "#F44336",
  "#D32F2F",
  "#B71C1C",
  
]

export default function TemperatureCard(props) {
  const [deviceIdx, setDeviceIdx] = React.useState(
    ()=> {
      for(let i=0;i<props.devices.length;i++){
        if (props.devices[i].type === "ac"){
          return i
        }
      }
    }
  );
  const [selectedRoom, setSelectedRoom] = React.useState(() => props.devices[deviceIdx].room);

  const [targetTemperature, setTargetTemperature] = React.useState();
  const [arcColor, setArcColor] = React.useState();

  const handleRoomChange = (val) => {
    setSelectedRoom(val);

    let tmpDeviceIdx=-1

    for(let i=0;i<props.devices.length;i++){
      if (props.devices[i].type === "ac" && props.devices[i].room === val){
        tmpDeviceIdx = i
        break;
      }
    }

    setDeviceIdx(tmpDeviceIdx);

    if (tmpDeviceIdx !== -1){
      setTargetTemperature(props.devices[tmpDeviceIdx].targetTemperature);
      setArcColor(colorsArray[props.devices[tmpDeviceIdx].targetTemperature - 15]);
    }

  };


  React.useEffect(
    () => {
      setTargetTemperature(props.devices[deviceIdx].targetTemperature)
      setArcColor(colorsArray[props.devices[deviceIdx].targetTemperature - 15])
    }, [props.devices]
  )

  return (
    <OutItem elevation={5}>
      <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>Temperature</h2>
      <InItem>
        <Grid container spacing={2}>
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
                {props.rooms.map((room, idx) => (
                  <MenuItem key={idx} value={room.name}>{room.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          { deviceIdx !== -1 && 
            <>
            <Grid item xs={12}>
              <CircularSlider
                disabled={!props.devices[deviceIdx].on}
                size={300}
                trackWidth={10}
                handleSize={10}
                minValue={15}
                maxValue={30}
                startAngle={50}
                endAngle={310}
                handle1={{
                  value: targetTemperature,
                  onChange: (v) => {
                    setTargetTemperature(v);
                    setArcColor(colorsArray[parseInt(v) - 15]);
                  },
                }}
                onControlFinished={() =>
                  props.handleTemperatureTarget(targetTemperature,deviceIdx)
                }
                arcColor={ props.devices[deviceIdx].on ?
                  arcColor
                  :
                  "#787878"
                }
                arcBackgroundColor="#AAAAAA"
              />
              <div style={{ marginTop: "-24vh" }}>
                {props.devices[deviceIdx].on ? (
                  <h2>Target {parseInt(targetTemperature)}°</h2>
                ) : (
                  <h2>OFF</h2>
                )}

                <Divider
                  sx={{
                    borderBottomWidth: 5,
                    width: "50%",
                    margin: "auto",
                    bgcolor: "#AAAAAA",
                    borderRadius: "5px",
                  }}
                />
                <h2>Now {props.devices[deviceIdx].currentTemperature}°</h2>

                <Stack justifyContent="center" direction="row" spacing={4}>
                  {props.devices[deviceIdx].on ? (
                    <IconButton
                      onClick={() => props.handleMinusTemperature(deviceIdx)}
                      sx={{
                        bgcolor: "#2196F3",
                        "&:hover": { bgcolor: "#1C7ECC" },
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  ) : (
                    <IconButton disable>
                      <RemoveIcon />
                    </IconButton>
                  )}

                  {props.devices[deviceIdx].on ? (
                    <IconButton
                      onClick={() => props.handlePlusTemperature(deviceIdx)}
                      sx={{
                        bgcolor: "#FF6F22",
                        "&:hover": { bgcolor: "#D95E1D" },
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  ) : (
                    <IconButton disable>
                      <AddIcon />
                    </IconButton>
                  )}
                </Stack>
              </div>
            </Grid>
            <Grid item xs={12}>
              <IconButton
                onClick={() => props.handleTemperatureOnOff(deviceIdx)}
                sx={{
                  bgcolor: props.devices[deviceIdx].on ? "#FFC107" : "#DDDEDF",
                  "&:hover": {
                    bgcolor: props.devices[deviceIdx].on ? "#D9A406" : "#B6B7B8",
                  },
                }}
              >
                <PowerSettingsNewIcon />
              </IconButton>
            </Grid>
            </>
          }

          
        </Grid>
      </InItem>
    </OutItem>
  );
}
