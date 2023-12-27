import AppBarStyled from "../components/AppBarStyled";
import LightsCard from "../components/LightsCard";
import Grid from "@mui/material/Grid";
import TemperatureCard from "../components/TemperatureCard";
import SecurityCard from "../components/SecurityCard";
import CameraCard from "../components/CameraCard";
import * as React from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LockIcon from '@mui/icons-material/Lock';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


export default function LogIn() {

  let navigate = useNavigate();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  React.useEffect(()  => {
    if (mobile){
      document.body.style.margin = 0
    }else{
      document.body.style.margin = "2vw"
    }
  },[mobile]);

  const handleLogIn = () => {
    //! API call

    navigate("/dashboard");
    document.body.style.margin = "5vw"
    document.body.style.marginTop = "3vh"
  };

  return (
  <Grid container>
    <Grid item xs={0} sm={6} md={8}
       height="90vh"
       sx={{
        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderTopLeftRadius: "20px",
        borderBottomLeftRadius: "20px"
      }}
    />
    <Grid item xs={12} sm={6} md={4}>
      <Box 
        sx={{ 
          backgroundColor:"#111827", 
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px" 
        }} 
        height={ mobile ? "100vh" : "100%" } >
        <Grid container textAlign='center'>
          <Grid item xs={12} sx={{ marginTop:"5vh" }}>
            <LockIcon/>
          </Grid>
          <Grid item xs={12}>
            <h2>Log In</h2>
          </Grid>
          <Grid item xs={12} sx={{ marginTop:"5vh" }}>
            <TextField 
              label="Email" 
              variant="outlined" 
              sx={{
                width: "70%",
                backgroundColor: "#374151",
                borderRadius: "10px",
                borderColor: "#FFFFFF",
                svg: { color: "#FFFFFF" },
                input: { color: "#FFFFFF" },
                label: { color: "#FFFFFF" },
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop:"5vh" }}>
            <TextField 
              label="Password" 
              variant="outlined" 
              sx={{
                width: "70%",
                backgroundColor: "#374151",
                borderRadius: "10px",
                borderColor: "#FFFFFF",
                svg: { color: "#FFFFFF" },
                input: { color: "#FFFFFF" },
                label: { color: "#FFFFFF" },
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop:"5vh" }}>
            <Button variant="contained" sx={{ fontWeight: "bold" }} onClick={() => handleLogIn()}>Log In</Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  </Grid>
  );
}