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

export default function DrawerStyled(props) {
  let navigate = useNavigate();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
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
          AppName
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

        <Button
          sx={{
            my: 2,
            color: "white",
            fontWeight: "bold",
            bgcolor: props.navbar == "files" && "#374151",
            "&:hover":
              props.navbar == "files"
                ? { bgcolor: "#111827" }
                : { bgcolor: "#374151" },
          }}
          onClick={() => {
            navigate("/files");
          }}
        >
          FILES
        </Button>
      </Stack>
      <Stack
        spacing={2}
        sx={{ padding: "1vw", marginTop: `auto`, marginBottom: "3vh" }}
      >
        <Button
          sx={{
            backgroundColor: "#E53935",
            color: "white",
            fontWeight: "bold",
          }}
          variant="contained"
          onClick={() => handleLogout()}
        >
          Logout
          <LogoutIcon sx={{ marginLeft: "1vw" }} />
        </Button>
      </Stack>
    </Drawer>
  );
}
