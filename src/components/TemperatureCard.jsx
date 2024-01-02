import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import * as React from "react";
import {CircularSliderWithChildren} from 'react-circular-slider-svg';
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
  '#0000ff', 
  '#1100ee',
  '#2200dd', 
  '#3300cc',
  '#4400bb', 
  '#5500aa',
  '#660099', 
  '#770088',
  '#880077', 
  '#990066',
  '#aa0055', 
  '#bb0044',
  '#cc0033', 
  '#dd0022',
  '#ee0011', 
  '#ff0000'
]

export default function TemperatureCard(props) {
  const [size, setSize] = React.useState(null);

  const slider = React.useCallback(node => { //! Resize slider
    if (node !== null) {
      setSize(node.getBoundingClientRect().width);
    }
  }, []);

  const [deviceIdx, setDeviceIdx] = React.useState(
    ()=> {
      for(let i=0;i<props.devices.length;i++){
        if (props.devices[i].type === "Temperature"){
          return i
        }
      }
      return -1
    }
  );
  const [selectedRoom, setSelectedRoom] = React.useState(() => {
    if ( deviceIdx === -1 ){
      return null
    }else{
      return props.devices[deviceIdx].room
    }
  });

  const [targetTemperature, setTargetTemperature] = React.useState(() => {
    if ( deviceIdx === -1 ){
      return null
    }else{
      return props.devices[deviceIdx].targetTemperature
    }
  });

  const [arcColor, setArcColor] = React.useState(() => {
    if ( deviceIdx === -1 ){
      return null
    }else{
      return colorsArray[props.devices[deviceIdx].targetTemperature - 15]
    }
  });

  const handleRoomChange = (val) => {
    setSelectedRoom(val);

    let tmpDeviceIdx=-1

    for(let i=0;i<props.devices.length;i++){
      if (props.devices[i].type === "Temperature" && props.devices[i].room === val){
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

  const handleMinusTemperature = (val) => {
    const newTemp = parseInt(props.devices[val].targetTemperature - 1);
    if (props.devices[val].on) {
      if (newTemp >= 15) {
        setTargetTemperature(newTemp)
        setArcColor(colorsArray[newTemp - 15])

        props.handleMinusTemperature(val)
      }
    }
  }

  const handlePlusTemperature = (val) => {
    const newTemp = parseInt(props.devices[val].targetTemperature + 1);
    if (props.devices[val].on) {
      if (newTemp <= 30) {
        setTargetTemperature(newTemp)
        setArcColor(colorsArray[newTemp - 15])

        props.handlePlusTemperature(val)
      }
    }
  };


  React.useEffect( // when device deleted
    () => {

      for(let i=0;i<props.devices.length;i++){
        if (props.devices[i].type === "Temperature" && props.devices[i].room === selectedRoom){
          return
        }
      }

      setDeviceIdx(-1)

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

          { props.devices[deviceIdx] !== undefined &&
            <>
            <Grid item xs={12} ref={slider}>
              <CircularSliderWithChildren
                disabled={!props.devices[deviceIdx].on}
                size={size}
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
              >              
              <div>
                {props.devices[deviceIdx].on ? (
                  <h2 style={{marginTop:"2vh"}}>Target {parseInt(targetTemperature)}°</h2>
                ) : (
                  <h2 style={{marginTop:"2vh"}}>OFF</h2>
                )}

                <Divider
                  sx={{
                    borderBottomWidth: 5,
                    margin: "auto",
                    bgcolor: "#AAAAAA",
                    borderRadius: "5px",
                  }}
                />
                <h2>Now {props.devices[deviceIdx].currentTemperature}°</h2>
                <Stack justifyContent="center" direction="row" spacing={4}>
                  {props.devices[deviceIdx].on ? (
                    <IconButton
                      onClick={() => handleMinusTemperature(deviceIdx)}
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
                      onClick={() => handlePlusTemperature(deviceIdx)}
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
              </div>
              </CircularSliderWithChildren>             
            </Grid>
            </>
          }

          
        </Grid>
      </InItem>
    </OutItem>
  );
}
