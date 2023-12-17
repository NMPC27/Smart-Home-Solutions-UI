import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';

import { useNavigate } from "react-router-dom";


export default function AppBarStyled() {
    let navigate = useNavigate();


    const [openDrawer, setopenDrawer] = React.useState(false)

    const [navbar, setNavbar] = React.useState("dashboard")

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#111827", borderRadius: "20px" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2, strokeWidth: 1, stroke: "#FFFFFF" }}
            onClick={() => setopenDrawer(!openDrawer)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            AppName
          </Typography>
          <Button variant="contained" sx={{ fontWeight: "bold" }} >+ DEVICE</Button>
        </Toolbar>
      </AppBar>

      <Drawer
        PaperProps={{
            sx: {
                bgcolor: "#111827",
                borderRadius: "20px",
                color: "#FFFFFF",
                width: "250px"
            }
            
        }}
        anchor={"left"}
        open={openDrawer}
        onClose={() => setopenDrawer(false) }
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2, strokeWidth: 1, stroke: "#FFFFFF" }}
            onClick={() => setopenDrawer(!openDrawer)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            AppName
          </Typography>
        </Toolbar>

        {/* Drawer */}
        <Stack spacing={2} sx={{ padding:"1vw" }}>
            <Button
                sx={{
                    my: 2,
                    color: "white",
                    fontWeight: "bold",
                    bgcolor: navbar == "dashboard" && "#374151",
                    "&:hover":
                    navbar == "dashboard"
                        ? { bgcolor: "#111827" }
                        : { bgcolor: "#374151" },
                    marginRight: "1vw",
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
                    bgcolor: navbar == "energy" && "#374151",
                    "&:hover":
                    navbar == "energy"
                        ? { bgcolor: "#111827" }
                        : { bgcolor: "#374151" },
                    marginRight: "1vw",
                }}
                onClick={() => {
                    navigate("/energy");
                }}
                >
                ENERGY
                </Button>

                <Button
                sx={{
                    my: 2,
                    color: "white",
                    fontWeight: "bold",
                    bgcolor: navbar == "files" && "#374151",
                    "&:hover":
                    navbar == "files"
                        ? { bgcolor: "#111827" }
                        : { bgcolor: "#374151" },
                    marginRight: "1vw",
                }}
                onClick={() => {
                    navigate("/files");
                }}
                >
                FILES
            </Button>
        </Stack>

      </Drawer>
    </>
  );
}
