import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import BasicDatePicker from "./BasicDatePicker";

import { useNavigate } from "react-router-dom";

export default function AppBarStyled() {
  let navigate = useNavigate();

  const [openDrawer, setopenDrawer] = React.useState(false);

  const [navbar, setNavbar] = React.useState("dashboard");

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
            onClick={() => setopenDrawer(!openDrawer)}
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
          {navbar == "dashboard" && (
            <Stack direction="row" spacing={2}>
              <Button variant="contained" sx={{ fontWeight: "bold" }}>
                + ROOM
              </Button>
              <Button variant="contained" sx={{ fontWeight: "bold" }}>
                + DEVICE
              </Button>
            </Stack>
          )}
          {navbar == "energy" && <BasicDatePicker />}
          {navbar == "files" && <></>}
        </Toolbar>
      </AppBar>

      <Drawer
        PaperProps={{
          sx: {
            bgcolor: "#111827",
            borderRadius: "20px",
            color: "#FFFFFF",
            width: "250px",
            margin: "5vw",
            marginTop: "3vh",
          },
        }}
        anchor={"left"}
        open={openDrawer}
        onClose={() => setopenDrawer(false)}
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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            AppName
          </Typography>
        </Toolbar>

        {/* Drawer */}
        <Stack spacing={2} sx={{ padding: "1vw" }}>
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
            }}
            onClick={() => {
              navigate("/dashboard");
              setNavbar("dashboard");
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
            }}
            onClick={() => {
              navigate("/energy");
              setNavbar("energy");
            }}
          >
            ENERGY
          </Button>

          <Button
            sx={{
              my: 2,
              color: "white",
              fontWeight: "bold",
              bgcolor: navbar == "automation" && "#374151",
              "&:hover":
                navbar == "automation"
                  ? { bgcolor: "#111827" }
                  : { bgcolor: "#374151" },
            }}
            onClick={() => {
              navigate("/automation");
              setNavbar("automation");
            }}
          >
            AUTOMATION
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
            }}
            onClick={() => {
              navigate("/files");
              setNavbar("files");
            }}
          >
            FILES
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
