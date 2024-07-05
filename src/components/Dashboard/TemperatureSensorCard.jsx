import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getSensor } from "../API";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const OutItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#111827",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#FFFFFF",
  borderRadius: "20px",
  height: 400,
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
  overflow: "auto",
}));

export default function TemperatureSensorCard(props) {
  const [selectedRoom, setSelectedRoom] = React.useState("All");

  const [sensors, setSensors] = React.useState([]);

  const [openErrorMsg, setOpenErrorMsg] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    if (props.globalRoom !== "Any") {
      setSelectedRoom(props.globalRoom);
    }
  }, [props.globalRoom]);

  React.useEffect(() => {
    let tmpSensors = [];

    for (let i = 0; i < props.devices.length; i++) {
      if (
        props.devices[i].type === "Temperature Sensor" ||
        props.devices[i].type === "Humidity Sensor"
      ) {
        tmpSensors.push(props.devices[i]);
      }
    }

    setSensors([...tmpSensors]);

    const interval = setInterval(() => {
      for (let i = 0; i < tmpSensors.length; i++) {
        getSensor(tmpSensors[i].id)
          .then((res) => {
            if (tmpSensors[i].type === "Temperature Sensor") {
              tmpSensors[i].currentTemperature = res.data;
            } else if (tmpSensors[i].type === "Humidity Sensor") {
              tmpSensors[i].currentHumidity = res.data;
            }
            setSensors([...tmpSensors]);
          })
          .catch((error) => {
            if ("response" in error) {
              setErrorMsg("Error " + error.response.status);
              setOpenErrorMsg(true);
            }
          });
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [props.devices]);

  return (
    <>
      <OutItem elevation={5}>
        <h2 style={{ marginTop: 10, marginBottom: 16 }}>Temperature Sensor</h2>
        <InItem>
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

            {sensors.map((val) => {
              if (selectedRoom === "All" || selectedRoom === val.room) {
                return (
                  <>
                    <Grid item xs={9}>
                      <h3>{val.name}</h3>
                    </Grid>
                    <Grid item xs={3}>
                      {val.type === "Temperature Sensor" ? (
                        <h3>{val.currentTemperature}°C</h3>
                      ) : (
                        <h3>{val.currentHumidity}%</h3>
                      )}
                    </Grid>
                  </>
                );
              }
            })}
          </Grid>
        </InItem>
      </OutItem>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openErrorMsg}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason !== "clickaway") {
            setOpenErrorMsg(false);
          }
        }}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={(event, reason) => {
            if (reason !== "clickaway") {
              setOpenErrorMsg(false);
            }
          }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

import PropTypes from "prop-types";
// PropTypes for validation
TemperatureSensorCard.propTypes = {
  globalRoom: PropTypes.string.isRequired,
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["Temperature Sensor", "Humidity Sensor"])
        .isRequired,
      name: PropTypes.string.isRequired,
      room: PropTypes.string.isRequired,
      currentTemperature: PropTypes.number,
      currentHumidity: PropTypes.number,
    }),
  ).isRequired,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
