import AppBarStyled from "../components/AppBar/AppBarStyled";
import LightsCard from "../components/Dashboard/LightsCard";
import Grid from "@mui/material/Grid";
import TemperatureCard from "../components/Dashboard/TemperatureCard";
import SecurityCard from "../components/Dashboard/SecurityCard";
import CameraCard from "../components/Dashboard/CameraCard";
import * as React from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LockIcon from '@mui/icons-material/Lock';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { doLogin } from "../components/API";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Link from '@mui/material/Link';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function SignIn() {

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

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [openErrorMsg1, setOpenErrorMsg1] = React.useState(false); // fill all the fields!
  const [openErrorMsg2, setOpenErrorMsg2] = React.useState(false); // Incorrect username or password!

  const handleLogIn = () => {

    if (email === "" || password === "") {
      setOpenErrorMsg1(true)
      return
    }
    
    doLogin(email,password).then(//! API call
      (response) => {
        localStorage.setItem('token', response.data.access_token)

        navigate("/dashboard");
        document.body.style.margin = "5vw"
        document.body.style.marginTop = "3vh"
      },
      (error) => {
        setOpenErrorMsg2(true)
      }
    )

  };

  return (
  <>
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
            <h2>Sign In</h2>
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
              onChange={e => setEmail(e.target.value)} 
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop:"5vh" }}>
            <TextField 
              label="Password" 
              variant="outlined" 
              type="password"
              sx={{
                width: "70%",
                backgroundColor: "#374151",
                borderRadius: "10px",
                borderColor: "#FFFFFF",
                svg: { color: "#FFFFFF" },
                input: { color: "#FFFFFF" },
                label: { color: "#FFFFFF" },
              }}
              onChange={e => setPassword(e.target.value)} 
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop:"1vh" }}>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item xs={12} sx={{ marginTop:"1vh" }}>
            <Link href="/signUp" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
          <Grid item xs={12} sx={{ marginTop:"5vh" }}>
            <Button variant="contained" sx={{ fontWeight: "bold" }} onClick={() => handleLogIn()}>Log In</Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  </Grid>
  <Snackbar 
    anchorOrigin={{ vertical: "top", horizontal:"center" }}
    open={openErrorMsg1} 
    autoHideDuration={6000} 
    onClose={(event, reason) => {
        if (reason !== 'clickaway') {
            setOpenErrorMsg1(false);
        }
    }}
  >
    <Alert 
        severity="error" 
        sx={{ width: '100%' }}
        onClose={(event, reason) => {
            if (reason !== 'clickaway') {
                setOpenErrorMsg1(false);
            }
        }}
    >
        Fill all the fields!
    </Alert>
  </Snackbar>
  <Snackbar 
    anchorOrigin={{ vertical: "top", horizontal:"center" }}
    open={openErrorMsg2} 
    autoHideDuration={6000} 
    onClose={(event, reason) => {
        if (reason !== 'clickaway') {
            setOpenErrorMsg2(false);
        }
    }}
  >
    <Alert 
        severity="error" 
        sx={{ width: '100%' }}
        onClose={(event, reason) => {
            if (reason !== 'clickaway') {
                setOpenErrorMsg2(false);
            }
        }}
    >
        Incorrect email or password!
    </Alert>
  </Snackbar>
  </>
  );
}