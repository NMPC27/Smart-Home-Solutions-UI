import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { CircularSliderWithChildren } from "react-circular-slider-svg";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { getSensor } from "../API";

const OutItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#111827",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#FFFFFF",
  borderRadius: "20px",
  height: 640
}));

const InItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "20px",
  minHeight: 520,
  maxHeight: 520, 
}));

const colorsArray = [
  '#4F6596', '#526f97', '#567998', '#59839a',
  '#5c8d9b', '#60969c', '#63a09d', '#66aa9f',
  '#6ab4a0', '#6DBEA1', '#75c2a6', '#7dc5ac',
  '#84c9b1', '#8cccb7', '#94d0bc', '#9cd3c2',
  '#a3d7c7', '#abdacd', '#B3DED2', '#b9e0ca',
  '#bfe1c3', '#c6e3bb', '#cce5b4', '#d2e6ac',
  '#d8e8a5', '#dfea9d', '#e5eb96', '#EBED8E',
  '#edeb8d', '#eeea8b', '#f0e88a', '#f1e789',
  '#f3e587', '#f4e486', '#f6e285', '#f7e183',
  '#F9DF82', '#f9d97f', '#f9d37c', '#f9cd78',
  '#f9c775', '#f9c172', '#f9bb6f', '#f9b56b',
  '#f9af68', '#F9A965', '#f8a261', '#f79a5e',
  '#f5935a', '#f48b57', '#f38453', '#f27c50',
  '#f0754c', '#ef6d49', '#EE6645', '#e96045',
  '#e45a45', '#de5445', '#d94e45', '#d44845',
  '#cf4245', '#c93c45', '#c43645', '#BF3045'
]

export default function TemperatureCard(props) {

  const [size, setSize] = React.useState(null);

  // const slider = React.useCallback((node) => {
  //   //! Resize slider
  //   if (node !== null) {
  //     setSize(node.getBoundingClientRect().width);
  //   }
  // }, []);

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
        // Depending on the layout, you may need to swap inlineSize with blockSize
        // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
        setSize(event[0].contentBoxSize[0].inlineSize);
    });

    if (document.getElementById("slider")) {
      resizeObserver.observe(document.getElementById("slider"));
    }
});

  const [deviceIdx, setDeviceIdx] = React.useState(() => {
    for (let i = 0; i < props.devices.length; i++) {
      if (props.devices[i].type === "Temperature") {
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

  const [targetTemperature, setTargetTemperature] = React.useState(() => {
    if (deviceIdx === -1) {
      return null;
    } else {
      return props.devices[deviceIdx].targetTemperature;
    }
  });

  const [arcColor, setArcColor] = React.useState(() => {
    if (deviceIdx === -1) {
      return null;
    } else {
      return colorsArray[(props.devices[deviceIdx].targetTemperature - 15)*4];
    }
  });

  const handleRoomChange = (val) => {
    setSelectedRoom(val);

    let tmpDeviceIdx = -1;

    for (let i = 0; i < props.devices.length; i++) {
      if (
        props.devices[i].type === "Temperature" &&
        props.devices[i].room === val
      ) {
        tmpDeviceIdx = i;
        break;
      }
    }

    setDeviceIdx(tmpDeviceIdx);

    if (tmpDeviceIdx !== -1) {
      setTargetTemperature(props.devices[tmpDeviceIdx].targetTemperature);
      setArcColor(
        colorsArray[props.devices[tmpDeviceIdx].targetTemperature - 15],
      );
    }
  };

  const handleMinusTemperature = (val) => {
    const newTemp = parseInt(props.devices[val].targetTemperature - 1);
    if (props.devices[val].on) {
      if (newTemp >= 15) {
        setTargetTemperature(newTemp);
        setArcColor(colorsArray[(newTemp - 15) * 4]);

        props.handleMinusTemperature(val);
      }
    }
  };

  const handlePlusTemperature = (val) => {
    const newTemp = parseInt(props.devices[val].targetTemperature + 1);
    if (props.devices[val].on) {
      if (newTemp <= 30) {
        setTargetTemperature(newTemp);
        setArcColor(colorsArray[(newTemp - 15) * 4]);

        props.handlePlusTemperature(val);
      }
    }
  };

  React.useEffect(
    () => {

      if ( deviceIdx === -1 ) return;

      let temp = props.devices[deviceIdx].targetTemperature

      setTargetTemperature(temp);
      setArcColor(colorsArray[(temp - 15) * 4]);
    },
    [props.devices],
  );

  React.useEffect(() => {
    if (props.globalRoom !== "Any") {
      handleRoomChange(props.globalRoom);
    }
  }, [props.globalRoom]);

  const [sensorTemperature, setSensorTemperature] = React.useState("--");
  const [sensorHumidity, setSensorHumidity] = React.useState("--");

  React.useEffect(() => {

    let sensorTemperatureID = null
    let sensorHumidityID = null

    setSensorTemperature("--")
    setSensorHumidity("--")

    for(let i = 0; i < props.devices.length; i++) {
      if (props.devices[i].room === selectedRoom) {
        if (props.devices[i].type === "Temperature Sensor") {
          sensorTemperatureID = props.devices[i].id;
          setSensorTemperature(props.devices[i].currentTemperature);
        } else if (props.devices[i].type === "Humidity Sensor") {
          sensorHumidityID = props.devices[i].id;
          setSensorHumidity(props.devices[i].currentHumidity);
        }
      }
    }

    const interval = setInterval(() => {
      if (sensorTemperatureID !== null) { 
        getSensor(sensorTemperatureID).then((res) => {
          setSensorTemperature(res.data);
        }).catch((error) => {
          if ("response" in error) {
            setErrorMsg(error.response.status+" "+error.response.data.detail);
            setOpenErrorMsg(true);
          }
        })
      }

      if (sensorHumidityID !== null) {
        getSensor(sensorHumidityID).then((res) => {
          setSensorHumidity(res.data);
        }).catch((error) => {
          if ("response" in error) {
            setErrorMsg(error.response.status+" "+error.response.data.detail);
            setOpenErrorMsg(true);
          }
        })
      }

    }, 60000);

    return () => clearInterval(interval);
  }, [deviceIdx]);

  return (
    <OutItem elevation={5}>
      <h2 style={{ marginTop: 10, marginBottom: 16 }}>Temperature</h2>
      <InItem >
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
                  <MenuItem key={idx} value={room.name}>
                    {room.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {props.devices[deviceIdx] !== undefined && (
            <>
            <Grid item xs={12}>
              <h2> {props.devices[deviceIdx].name} </h2>
            </Grid>
              <Grid item xs={12} marginBottom="2vh" id="slider" justifyContent="center" display="flex">
                <CircularSliderWithChildren
                  disabled={!props.devices[deviceIdx].on}
                  size={size > 430 ? 430 : size}
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
                      setArcColor(colorsArray[parseInt((targetTemperature - 15)*4)]);
                    },
                  }}
                  onControlFinished={() =>
                    props.handleTemperatureTarget(targetTemperature, deviceIdx)
                  }
                  arcColor={props.devices[deviceIdx].on ? arcColor : "#787878"}
                  arcBackgroundColor="#AAAAAA"
                >
                  <div>
                    {props.devices[deviceIdx].on ? (
                      <h2
                        style={{
                          marginTop: "2vh",
                          fontSize: "1.6em",
                        }}
                      >
                        Target {parseInt(targetTemperature)}°
                      </h2>
                    ) : (
                      <h2
                        style={{
                          marginTop: "2vh",
                          fontSize: "1.6em",
                        }}
                      >
                        OFF
                      </h2>
                    )}

                    <Divider
                      sx={{
                        borderBottomWidth: 5,
                        margin: "auto",
                        bgcolor: "#AAAAAA",
                        borderRadius: "5px",
                      }}
                    />
                    <h2
                      style={{
                        fontSize: "1.6em",
                      }}
                    >
                      {sensorTemperature}°C
                      {" | "}
                      {sensorHumidity}%
                    </h2>
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
                  </div>
                </CircularSliderWithChildren>
              </Grid>
            </>
          )}
        </Grid>
      </InItem>
    </OutItem>
  );
}
