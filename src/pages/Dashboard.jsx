import AppBarStyled from "../components/AppBarStyled"
import LightsCard from "../components/LightsCard"
import Grid from '@mui/material/Grid';
import TemperatureCard from "../components/TemperatureCard";

export default function Dashboard() {
  
    return (
        <>
        <AppBarStyled />

        <Grid container spacing={2} sx={{ padding: "1vw" }} >
            <Grid item xs={12} sm={6} md={3}>
                <LightsCard />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <LightsCard />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <TemperatureCard />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <TemperatureCard />
            </Grid>
        </Grid>

        </>
    )
}