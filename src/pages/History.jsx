import AppBarStyled from "../components/AppBar/AppBarStyled";
import Grid from "@mui/material/Grid";
import { LineChart } from "@mui/x-charts/LineChart";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { getHistory} from "../components/API";
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const chartColors = ["#2E96FF", "#FFA500", "#CC0000"];
const labels = {
  "Light": "Off/On",
  "Motion Sensor": "Not detected/Detected",
  "Camera": "Off/On",
  "Temperature": "Off/On",
  "Temperature Sensor": "°C",
  "Humidity Sensor": "%",
  "Power": "W",
}

const OutItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#111827",
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function History() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  let navigate = useNavigate();

  React.useEffect(() => {
    if (mobile) {
      document.body.style.margin = "1vw";
    } else {
      document.body.style.margin = "5vw";
      document.body.style.marginTop = "3vh";
    }
  }, [mobile]);

  const [history, setHistory] = React.useState(null);

  const [begin, setBegin] = React.useState(new Date("1970-01-01"));
  const [end, setEnd] = React.useState(new Date("1970-01-02"));
  const [minVal, setMinVal] = React.useState(new Date("1970-01-01"));
  const [maxVal, setMaxVal] = React.useState(new Date("1970-01-02"));
  const [sliderVal, setSliderVal] = React.useState([0,1440]);

  const [openErrorMsg, setOpenErrorMsg] = React.useState(false); 
  const [errorMsg, setErrorMsg] = React.useState("");

  const dateSliderChange = (event, newValue) => {
    if (newValue[0] >= newValue[1] - 20) { return }

    setSliderVal(newValue);
    setMinVal(new Date(begin.getTime() + newValue[0]*60000))
    setMaxVal(new Date(end.getTime() - (1440-newValue[1])*60000))
  }

  React.useEffect(() => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    var begin = new Date(yyyy,mm-1,dd);
    var end = new Date(yyyy,mm-1,dd);
    end.setDate(begin.getDate() + 1);

    setBegin(begin)
    setEnd(end)
    setMinVal(begin)
    setMaxVal(end)

    today = dd + "/" + mm + "/" + yyyy;

    //! API CALL with date

    getHistory(today).then(
      (res) => {
        setHistory(res.data);
      }
    ).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.data.detail);
        setOpenErrorMsg(true);
        setHistory(null)

        return
      } 

      navigate("/");
    })

  }, []);

  const [selectedDevicesIdx, setSelectedDevicesIdx] = React.useState([]);
  const [xAxis, setXAxis] = React.useState([]);
  const [yAxis, setYAxis] = React.useState([]);

  const handleDateChange = (val) => {

    var init_date=val.split("/")

    var begin = new Date(init_date[2],init_date[1]-1,init_date[0]);
    var end = new Date(init_date[2],init_date[1]-1,init_date[0]);
    end.setDate(begin.getDate() + 1);
    
    setBegin(begin)
    setEnd(end)
    setMinVal(begin)
    setMaxVal(end)

    getHistory(val).then((res) => {
      setHistory(res.data);

      let tmpXAxis = [];
      let tmpYAxis = [];
      for (let i = 0; i < selectedDevicesIdx.length; i++) {
        let tmpX = [];
        let tmpY = [];
        for(let j = 0; j < res.data[selectedDevicesIdx[i]].history.length; j++){
          tmpX.push(new Date(res.data[selectedDevicesIdx[i]].history[j][0]));
  
          let tmp = res.data[selectedDevicesIdx[i]].history[j][1];
          if (tmp === "off" || tmp === "unavailable") {
            tmp = 0;
          }
          if (tmp === "on" || tmp === "idle") {
            tmp = 1;
          }
  
          tmpY.push(tmp);
        }
        tmpXAxis.push(tmpX);
        tmpYAxis.push(tmpY);
      }

      setXAxis(tmpXAxis);
      setYAxis(tmpYAxis);
    }).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.data.detail);
        setOpenErrorMsg(true);
        setHistory(null)

        return
      } 

      navigate("/");
    })

  };

  const handleChangeDevices = (event) => {

    let devicesIdx = event.target.value;

    let tmpXAxis = [];
    let tmpYAxis = [];
    for (let i = 0; i < devicesIdx.length; i++) {
      let tmpX = [];
      let tmpY = [];
      for(let j = 0; j < history[devicesIdx[i]].history.length; j++){
        tmpX.push(new Date(history[devicesIdx[i]].history[j][0]));

        let tmp = history[devicesIdx[i]].history[j][1];
        if (tmp === "off" || tmp === "unavailable") {
          tmp = 0;
        }
        if (tmp === "on" || tmp === "idle") {
          tmp = 1;
        }

        tmpY.push(tmp);
      }
      tmpXAxis.push(tmpX);
      tmpYAxis.push(tmpY);
    }

    setXAxis(tmpXAxis);
    setYAxis(tmpYAxis);
    setSelectedDevicesIdx(devicesIdx);
  };


  if (history === null) {
    return (
      <>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Skeleton
              variant="rounded"
              height="7vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Skeleton
              variant="rounded"
              height="40vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
        </Grid>

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
  } else {
    return (
      <>
        <AppBarStyled navbar={"history"} handleDateChange={handleDateChange} />

        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">Device</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedDevicesIdx}
                onChange={handleChangeDevices}
                input={<OutlinedInput label="Device" />}
                renderValue={(selected) => {
                  let tmp = [];
                  for (let i = 0; i < selected.length; i++) {
                    tmp.push(history[selected[i]].name);
                  }
                  return tmp.join(", ");
                }}
                MenuProps={MenuProps}
              >
                {history.map((device,idx) => (
                  <MenuItem key={idx} value={idx}>
                    <Checkbox checked={selectedDevicesIdx.indexOf(idx) > -1} />
                    <ListItemText primary={device.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <OutItem>
              <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>
                History
              </h2>
              <InItem>
                { selectedDevicesIdx.length === 0 && 
                  <div style={{ width: "100%", height: "40vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <h1>Select a Device!</h1>
                  </div>
                }
                { selectedDevicesIdx.map((item, idx) => {
                    return(
                      <>
                        <div style={{ width: "100%", height: "40vh", minHeight: "300px" }}>
                          <LineChart
                            colors={[chartColors[idx%3]]}
                            xAxis={[{ data: xAxis[idx], label: "Hour", scaleType: "utc", min: minVal, max: maxVal }]}
                            yAxis={[{ label: labels[history[item].type], valueFormatter: (v) => {
                                if (labels[history[item].type] === "Not detected/Detected"){ 
                                  if (v === 0) {
                                    return "Not det";
                                  }
                                  if (v === 1) {
                                    return "Detect";
                                  }
                                  return ""
                                }
                                if (labels[history[item].type] === "Off/On"){ 
                                  if (v === 0) {
                                    return "Off";
                                  }
                                  if (v === 1) {
                                    return "On";
                                  }
                                  return ""
                                }
                              }
                            }]}
                            series={[{
                              data: yAxis[idx], 
                              label: history[item].name, 
                              curve: "stepAfter", 
                              valueFormatter: (v) => {
                                if (labels[history[item].type] === "Not detected/Detected"){ 
                                  if (v === 0) {
                                    return "Not detected";
                                  } else {
                                    return "Detected";
                                  }
                                }
                                if (labels[history[item].type] === "Off/On"){ 
                                  if (v === 0) {
                                    return "Off";
                                  } else {
                                    return "On";
                                  }
                                }

                                return v + " " + labels[history[item].type];
                              }
                            }]}
                            legend={{ hidden: true }}
                          />
                        </div>
                        <Stack spacing={2} alignItems="center" justifyContent="center">
                          <Slider
                            value={sliderVal}
                            onChange={dateSliderChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={1440}
                            sx={{ mt: 2 }}
                            valueLabelFormat={(value) => {
                              let hours = Math.floor(value / 60);
                              let minutes = value % 60;
                              return hours + "h " + minutes + "m";
                            }}
                          />
                          <Button 
                            disabled
                            variant="contained" 
                            sx={{ 
                              '&:disabled': {
                                backgroundColor: chartColors[idx%3],
                                color: "#FFFFFF",
                              },
                            }}
                          >
                            <b>{history[item].name}</b>
                          </Button>
                        </Stack>
                      </>
                  )})
                }
                
              </InItem>
            </OutItem>
          </Grid>
        </Grid>
      </>
    );
  }
}
