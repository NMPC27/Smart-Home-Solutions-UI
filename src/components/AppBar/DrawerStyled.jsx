import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import { minidenticon } from 'minidenticons'
import { useMemo } from 'react'
import { getUser } from "../API";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MinidenticonImg = ({ username, saturation, lightness, ...props }) => {
  const svgURI = useMemo(
    () => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness]
  )
  return (<img src={svgURI} alt={username} {...props} />)
}

export default function DrawerStyled(props) {
  let navigate = useNavigate();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xl"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [name,setName] = React.useState("")
  const [openErrorMsg, setOpenErrorMsg] = React.useState(false); 
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(()=>{
    getUser().then(
      (res) => {
        setName(res.data);
      }
    ).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.data.detail);
        setOpenErrorMsg(true);

        return
      } 

      navigate("/");
    })
  },[])

  return (
    <>
      <Drawer
        PaperProps={{
          sx: {
            bgcolor: "#111827",
            borderRadius: "20px",
            color: "#FFFFFF",
            width: "250px",
            margin: mobile ? "1vw" : "5vw",
            marginTop: mobile ? "1vw" : "3vh",
          },
        }}
        anchor={"left"}
        open={props.openDrawer}
        onClose={() => props.handleCloseDrawer()}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2, strokeWidth: 1, stroke: "#FFFFFF" }}
            onClick={() => props.handleCloseDrawer()}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Smartify
            <RssFeedIcon />
          </Typography>
        </Toolbar>

        <Stack spacing={2} sx={{ padding: "1vw" }}>
          <Button
            sx={{
              my: 2,
              color: "white",
              fontWeight: "bold",
              bgcolor: props.navbar == "dashboard" && "#374151",
              "&:hover":
                props.navbar == "dashboard"
                  ? { bgcolor: "#111827" }
                  : { bgcolor: "#374151" },
            }}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            DASHBOARD
          </Button>

          <Button
            sx={{
              my: 2,
              color: "white",
              fontWeight: "bold",
              bgcolor: props.navbar == "automation" && "#374151",
              "&:hover":
                props.navbar == "automation"
                  ? { bgcolor: "#111827" }
                  : { bgcolor: "#374151" },
            }}
            onClick={() => {
              navigate("/automation");
            }}
          >
            AUTOMATION
          </Button>

          <Button
            sx={{
              my: 2,
              color: "white",
              fontWeight: "bold",
              bgcolor: props.navbar == "building" && "#374151",
              "&:hover":
                props.navbar == "building"
                  ? { bgcolor: "#111827" }
                  : { bgcolor: "#374151" },
            }}
            onClick={() => {
              navigate("/building");
            }}
          >
            BUILDING
          </Button>

          <Button
            sx={{
              my: 2,
              color: "white",
              fontWeight: "bold",
              bgcolor: props.navbar == "history" && "#374151",
              "&:hover":
                props.navbar == "history"
                  ? { bgcolor: "#111827" }
                  : { bgcolor: "#374151" },
            }}
            onClick={() => {
              navigate("/history");
            }}
          >
            HISTORY
          </Button>

          <Button
            sx={{
              my: 2,
              color: "white",
              fontWeight: "bold",
              bgcolor: props.navbar == "energy" && "#374151",
              "&:hover":
                props.navbar == "energy"
                  ? { bgcolor: "#111827" }
                  : { bgcolor: "#374151" },
            }}
            onClick={() => {
              navigate("/energy");
            }}
          >
            ENERGY
          </Button>
        </Stack>
        <Stack
          spacing={2}
          sx={{ padding: "1vw", marginTop: `auto`, marginBottom: "3vh" }}
        >
          <Stack direction="row" spacing={2}>
            <div style={{ backgroundColor: "#374151", borderRadius: "50%", width: 50, height: 50 }}>
              <MinidenticonImg username={name} saturation="90" width="50" height="50" />
            </div>          
            <Typography variant="h6" style={{ fontWeight: "bold", marginTop: 10 }}>
              {name}
            </Typography>
          </Stack>
              
          <Button
            sx={{
              backgroundColor: "#E53935",
              color: "white",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#C62828" },
            }}
            variant="contained"
            onClick={() => handleLogout()}
          >
            Logout
            <LogoutIcon sx={{ marginLeft: "1vw" }} />
          </Button>
        </Stack>
      </Drawer>
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
