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


export default function AppBarStyled(props) {

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
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
          {props.navbar == "dashboard" && (
            <Stack direction="row" spacing={2}>
              <Button variant="contained" sx={{ fontWeight: "bold" }}>
                + ROOM
              </Button>
              <Button variant="contained" sx={{ fontWeight: "bold" }}>
                + DEVICE
              </Button>
            </Stack>
          )}
          {props.navbar == "energy" && <BasicDatePicker handleDateChange={props.handleDateChange}/>}
          {props.navbar == "files" && <></>}
        </Toolbar>
      </AppBar>

      <DrawerStyled 
        openDrawer={openDrawer} 
        handleCloseDrawer={handleCloseDrawer}
        navbar={props.navbar}
      />
    </>
  );
}
