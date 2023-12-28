import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import BasicDatePicker from "./BasicDatePicker";
import DrawerStyled from "./DrawerStyled";
import RoomDialog from "./RoomDialog";
import DeviceDialog from "./DeviceDialog";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


export default function AppBarStyled(props) {

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const [openRoomDialog,setOpenRoomDialog] = React.useState(false);

  const [openDeviceDialog,setOpenDeviceDialog] = React.useState(false);

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleCloseRoomDialog = () => {
    setOpenRoomDialog(false);
  };

  const handleCloseDeviceDialog = () => {
    setOpenDeviceDialog(false);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ bgcolor: "#111827", borderRadius: "20px", marginBottom: "3vh" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2, strokeWidth: 1, stroke: "#FFFFFF" }}
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            AppName
          </Typography>
          {props.navbar === "dashboard" && !mobile && 
            <Stack direction="row" spacing={2}>
              <Button variant="contained" sx={{ fontWeight: "bold" }} onClick={() => setOpenRoomDialog(true)}>
                + ROOM
              </Button>
              <Button variant="contained" sx={{ fontWeight: "bold" }} onClick={() => setOpenDeviceDialog(true)} >
                + DEVICE
              </Button>
            </Stack>
          }
          {props.navbar === "energy" && !mobile && <BasicDatePicker handleDateChange={props.handleDateChange}/>}
          {props.navbar === "files" && <></>}
        </Toolbar>
      </AppBar>

      {props.navbar === "dashboard" && mobile && 
        <Stack spacing={2} alignItems="center" marginBottom={"3vh"}>
          <Button variant="contained" sx={{ fontWeight: "bold", width:"70%" }} onClick={() => setOpenRoomDialog(true)}>
            + ROOM
          </Button>
          <Button variant="contained" sx={{ fontWeight: "bold", width:"70%" }} onClick={() => setOpenDeviceDialog(true)} >
            + DEVICE
          </Button>
        </Stack>
      }
      
      {
        props.navbar === "dashboard" && 
        <>
          <RoomDialog 
            openRoomDialog={openRoomDialog} 
            handleCloseRoomDialog={handleCloseRoomDialog}
            rooms={props.rooms}
            devices={props.devices}
            handleRoomAdd={props.handleRoomAdd}
            handleDeleteRoom={props.handleDeleteRoom}
          />

          <DeviceDialog
            openDeviceDialog={openDeviceDialog} 
            handleCloseDeviceDialog={handleCloseDeviceDialog}
            rooms={props.rooms}
            devices={props.devices}
            handleDeviceAdd={props.handleDeviceAdd}
            handleDeleteDevice={props.handleDeleteDevice}
          />
        </>
      }

      {props.navbar === "energy" && mobile && 
        <div style={{ marginBottom:"3vh", width:"70%", margin:"auto" }} >
          <BasicDatePicker handleDateChange={props.handleDateChange}/>
        </div>
      }
      
      <DrawerStyled 
        openDrawer={openDrawer} 
        handleCloseDrawer={handleCloseDrawer}
        navbar={props.navbar}
      />
    </>
  );
}
