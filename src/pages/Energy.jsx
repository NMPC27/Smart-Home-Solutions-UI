import AppBarStyled from "../components/AppBarStyled";
import Grid from "@mui/material/Grid";
import EnergyConsumptionChart from "../components/EnergyConsumptionChart";
import EnergyConsumptionPie from "../components/EnergyConsumptionPie";
import EnergyProductionChart from "../components/EnergyProductionChart";
import EnergyProductionPie from "../components/EnergyProductionPie";

export default function Energy() {
  return (
    <>
      <AppBarStyled />

      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={9}>
          <EnergyConsumptionChart />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <EnergyConsumptionPie />
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <EnergyProductionChart />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <EnergyProductionPie />
        </Grid>
      </Grid>
    </>
  );
}
