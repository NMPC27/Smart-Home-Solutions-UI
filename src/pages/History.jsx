import AppBarStyled from "../components/AppBar/AppBarStyled";
import Grid from "@mui/material/Grid";
import { LineChart } from "@mui/x-charts/LineChart";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import { getDevices} from "../components/API";
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
import Link from "@mui/material/Link";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const xAxis = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

const chartColors = ["#2E96FF", "#FFA500", "#CC0000"];


const datatmp = {
  1: {
    name: "AC bedroom",
    data: [0,0,0,1,1,1,1,0,0,0,0,1,1,1,0,1,1,1,0,0,0,1,1,1]
  },
  2:{
    name: "Lamp",
    data: [0,1,0,0,0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,0,0,1,1,1]
  }, 
  3:{
    name: "Light 1",
    data: [1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,1,1,1]
  }, 
  4:{
    name: "Light 2",
    data: [0,0,0,0,0,1,1,1,1,1,1,1,1,0,1,0,0,0,1,1,1,0,0,0]
  }
}

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
    }
  }, [mobile]);

  React.useEffect(() => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;

    //! API CALL with date

    getDevices().then(
      (res) => {
        setDevices(res.data);
      },
      () => {
        navigate("/");
      },
    );
  }, []);

  const [openErrorMsg1, setOpenErrorMsg1] = React.useState(false); // Select a maximum of 3 devices at a time

  const [devices, setDevices] = React.useState(null);
  const [selectedDevicesIdx, setSelectedDevicesIdx] = React.useState([]);
  const [data, setData] = React.useState([]);

  const [date, setDate] = React.useState();

  const handleDateChange = (val) => {
    setDate(val);

    // getEnergy(val).then((res) => {
    //   //! API CALL
    //   setData(res.data);
    // });
  };

  const handleChangeDevices = (event) => {

    if (event.target.value.length > 3) {
      setOpenErrorMsg1(true);
      return;
    }

    setSelectedDevicesIdx(event.target.value);

    let tmp = [];
    for (let i = 0; i < event.target.value.length; i++) {
      tmp.push( {data: datatmp[event.target.value[i]].data, label: datatmp[event.target.value[i]].name, curve: "stepBefore"} );
    }
    setData(tmp);
  };


  if (devices === null) {
    return (
      <>
        <AppBarStyled navbar={"history"} handleDateChange={handleDateChange} />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={9}>
            <Skeleton
              variant="rounded"
              height="40vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Skeleton
              variant="rounded"
              height="40vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Skeleton
              variant="rounded"
              height="40vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Skeleton
              variant="rounded"
              height="40vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
        </Grid>
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
                    tmp.push(datatmp[selected[i]].name);
                  }
                  return tmp.join(", ");
                }}
                MenuProps={MenuProps}
              >
                {devices.map((device,idx) => (
                  <MenuItem key={device.id} value={device.id}>
                    <Checkbox checked={selectedDevicesIdx.indexOf(device.id) > -1} />
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
                <div style={{ width: "100%", height: "40vh" }}>
                  <LineChart
                    colors={chartColors}
                    xAxis={[{ data: xAxis, label: "Hour" }]}
                    yAxis={[{ label: "On" }]}
                    series={data}
                    legend={{ hidden: true }}
                  />
                </div>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  {selectedDevicesIdx.map((item,idx) => {
                    return (
                      <>
                        <div
                          style={{
                            width: "2vh",
                            height: "2vh",
                            backgroundColor: chartColors[idx],
                          }}
                        />
                        <h4>{datatmp[item].name}</h4>
                      </>
                    );
                  })}
                </Stack>
              </InItem>
            </OutItem>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openErrorMsg1}
          autoHideDuration={6000}
          onClose={(event, reason) => {
            if (reason !== "clickaway") {
              setOpenErrorMsg1(false);
            }
          }}
        >
          <Alert
            severity="error"
            sx={{ width: "100%" }}
            onClose={(event, reason) => {
              if (reason !== "clickaway") {
                setOpenErrorMsg1(false);
              }
            }}
          >
            Select a maximum of 3 devices at a time!
          </Alert>
        </Snackbar>
      </>
    );
  }
}
