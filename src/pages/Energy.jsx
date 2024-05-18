import AppBarStyled from "../components/AppBar/AppBarStyled";
import Grid from "@mui/material/Grid";
import EnergyConsumptionChart from "../components/Energy/EnergyConsumptionChart";
import EnergyConsumptionPie from "../components/Energy/EnergyConsumptionPie";
import EnergyProductionChart from "../components/Energy/EnergyProductionChart";
import EnergyProductionPie from "../components/Energy/EnergyProductionPie";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import { getEnergy } from "../components/API";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Energy() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  let navigate = useNavigate();

  const [openErrorMsg, setOpenErrorMsg] = React.useState(false); 
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    if (mobile) {
      document.body.style.margin = "1vw";
    } else {
      document.body.style.margin = "5vw";
      document.body.style.marginTop = "3vh";
    }
  }, [mobile]);

  const [data, setData] = React.useState(null);

  const [date, setDate] = React.useState(null);

  React.useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;

    setDate(today);

    getEnergy(today).then(
      (res) => {
        setData(res.data);
      }
    ).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.statusText);
        setOpenErrorMsg(true);
        setData(null)

        return
      } 

      navigate("/");
    })
  }, []);

  const handleDateChange = (val) => {
    setDate(val);

    getEnergy(val).then((res) => { //! API CALL
      setData(res.data);
    }).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.statusText);
        setOpenErrorMsg(true);
        setData(null)

        return
      } 

      navigate("/");
    })
  };

  if (data === null) {
    return (
      <>
        <AppBarStyled navbar={"energy"} handleDateChange={handleDateChange} />

        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={9}>
            <Skeleton
              variant="rounded"
              height="40vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={3}>
            <Skeleton
              variant="rounded"
              height="40vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={9}>
            <Skeleton
              variant="rounded"
              height="40vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={3}>
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
        <AppBarStyled navbar={"energy"} handleDateChange={handleDateChange} />

        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={9}>
            <EnergyConsumptionChart consumption={data.consumption} date={date} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={3}>
            <EnergyConsumptionPie consumption={data.consumption} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={9}>
            <EnergyProductionChart production={data.production} date={date} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={3}>
            <EnergyProductionPie production={data.production} />
          </Grid>
        </Grid>
      </>
    );
  }
}
