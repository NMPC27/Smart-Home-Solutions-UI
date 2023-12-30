import AppBarStyled from "../components/AppBarStyled";
import Grid from "@mui/material/Grid";
import EnergyConsumptionChart from "../components/EnergyConsumptionChart";
import EnergyConsumptionPie from "../components/EnergyConsumptionPie";
import EnergyProductionChart from "../components/EnergyProductionChart";
import EnergyProductionPie from "../components/EnergyProductionPie";
import * as React from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';

const datatmp = {
	consumption:{
		grid: [10, 2, 2, 2, 2, 2, 2, 10, 20, 30, 40, 50, 30, 30, 15, 15, 40, 40, 80, 90, 100, 60, 40, 20],
		solar: [0, 0, 0, 0, 0, 0, 10, 30, 40, 50, 60, 70, 80, 90, 120, 100, 80, 60, 30, 10, 0, 0, 0, 0],
		gas: [0, 0, 0, 0, 0, 0, 20, 40, 50, 80, 100, 70, 120, 60, 60, 80, 80, 90, 40, 30, 10, 0, 0, 0],
	},
	production: {
		solar: [0, 0, 0, 0, 0, 0, 10, 30, 40, 50, 60, 70, 80, 90, 120, 100, 80, 60, 30, 10, 0, 0, 0, 0],
		gas: [0, 0, 0, 0, 0, 0, 20, 40, 50, 80, 100, 70, 120, 60, 60, 80, 80, 90, 40, 30, 10, 0, 0, 0]
	}
}

export default function Energy() {

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'))

  React.useEffect(()  => {
    if (mobile){
      document.body.style.margin = 0
    }
  },[mobile]);

  const [data, setData] = React.useState([]);

  const [date, setDate] = React.useState();

  const handleDateChange = (val) => {
    setDate(val); // Tue, 05 Dec 2023 00:00:00 GMT

    //! API CALL

    // setData()
  };

    //! DELETE !!!
    React.useEffect( () => {
      setTimeout(()=>{
        setData(datatmp)
      }, 2000)
    },[])

  if (data.length === 0){
    return (
      <>
        <AppBarStyled navbar={"energy"} handleDateChange={handleDateChange} />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={9}>
            <Skeleton variant="rounded" height="40vh" sx={{ borderRadius:"20px" }} />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Skeleton variant="rounded" height="40vh" sx={{ borderRadius:"20px" }} />
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Skeleton variant="rounded" height="40vh" sx={{ borderRadius:"20px" }}/>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Skeleton variant="rounded" height="40vh" sx={{ borderRadius:"20px" }} />
          </Grid>
        </Grid>
      </>
    );
  } else {
    return (
      <>
        <AppBarStyled navbar={"energy"} handleDateChange={handleDateChange} />
  
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={9}>
            <EnergyConsumptionChart consumption={data.consumption}/>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <EnergyConsumptionPie consumption={data.consumption}/>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <EnergyProductionChart production={data.production}/>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <EnergyProductionPie production={data.production}/>
          </Grid>
        </Grid>
      </>
    );
  } 
}
