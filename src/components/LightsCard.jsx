import * as React from "react";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import LightsDialog from "./LightsDialog";

const OutItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1F2937",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#FFFFFF",
  borderRadius: "20px",
}));

const InItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "20px",
}));

const data = [
  {
    id: 1,
    name: "Kitchen",
    on: true,
    brightness: 100,
    color: "#FFFFFF",
  },
  {
    id: 2,
    name: "Bedroom",
    on: false,
    brightness: 100,
    color: "#FFFFFF",
  },
  {
    id: 3,
    name: "Bedroom#2",
    on: false,
    brightness: 100,
    color: "#FFFFFF",
  },
  {
    id: 4,
    name: "Bedroom#3",
    on: false,
    brightness: 100,
    color: "#FFFFFF",
  },
  {
    id: 5,
    name: "Bed 1",
    on: false,
    brightness: 100,
    color: "#FFFFFF",
  },
  {
    id: 6,
    name: "Bed 2",
    on: false,
    brightness: 80,
    color: "#FFFFFF",
  },
];

export default function LightsCard() {
  const [lights, setLights] = React.useState(data);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedLight, setSelectedLight] = React.useState(0);

  const handleOpenDialog = (e, idx) => {
    e.preventDefault();
    setSelectedLight(idx);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleLightColor = (val) => {
    //! API CALL - atençao isto vai criar muitas API calls !!!

    let tmp = [...lights];
    tmp[selectedLight].color = val;
    setLights(tmp);
  };

  const handleBrightnessChange = (val) => {
      //! API CALL

      let tmp = [...lights];
      tmp[selectedLight].brightness = val;
      setLights(tmp);
  };

  const handleLightOnOff = (idx) => {
      //! API CALL

      let tmp = [...lights];
      tmp[idx].on = !tmp[idx].on;
      setLights(tmp);
  };

  return (
    <OutItem elevation={5}>
      <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>Lights</h2>
      <InItem>
        <Grid container spacing={4}>
          {lights.map((val, idx) => {
            return (
              <Grid item xs={4} key={idx} >
                <Stack spacing={2}>
                  <IconButton
                    sx={{
                      borderRadius: "10px",
                      bgcolor: val.on ? "#FFC107" : "#DDDEDF",
                      "&:hover": { bgcolor: val.on ? "#D9A406" : "#B6B7B8" },
                      padding: "1vw",
                    }}
                    onClick={() => handleLightOnOff(idx)}
                    onContextMenu={(e) => handleOpenDialog(e, idx)}
                  >
                    <LightbulbOutlinedIcon />
                  </IconButton>

                  <b style={{ marginTop: 8 }}>{val.name}</b>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </InItem>
        <LightsDialog 
          openDialog={openDialog} 
          selectedLight={selectedLight}
          lights={lights}
          handleCloseDialog={handleCloseDialog}
          handleLightColor={handleLightColor}
          handleBrightnessChange={handleBrightnessChange}
          handleLightOnOff={handleLightOnOff}
        />
    </OutItem>
  );
}
