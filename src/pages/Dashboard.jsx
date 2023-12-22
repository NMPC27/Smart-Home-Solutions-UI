import AppBarStyled from "../components/AppBarStyled"
import LightsCard from "../components/LightsCard"
import Grid from '@mui/material/Grid';
import TemperatureCard from "../components/TemperatureCard";
import SecurityCard from "../components/SecurityCard";
import CameraCard from "../components/CameraCard";

export default function Dashboard() {
  
    return (
        <>
        <AppBarStyled />

        <Grid container spacing={4}>
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
            <Grid item xs={12} sm={6} md={2}>
                <SecurityCard />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <SecurityCard />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <CameraCard />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <CameraCard />
            </Grid>
        </Grid>

        </>
    )
}