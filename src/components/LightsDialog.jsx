import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Slider from "@mui/material/Slider";
import CloseIcon from "@mui/icons-material/Close";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { HexColorPicker } from "react-colorful";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function LightsDialog(props) {
    const [lightColor, setLightColor] = React.useState("#1F2937");

    const handleLightColor = (val) => { //! MUITAS API CALLS
        setLightColor(val);
        // props.handleLightColor(val,props.deviceIdx)
    }

    return (
        <Dialog
            fullWidth
            open={props.openDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => props.handleCloseDialog()}
            PaperProps={{ sx: { borderRadius: "20px" } }}
        >
            <DialogTitle bgcolor={"#1F2937"} color={"#FFFFFF"}>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
                {props.devices[props.deviceIdx].name} Light
            </h3>

            <IconButton
                onClick={() => props.handleCloseDialog()}
                sx={{
                position: "absolute",
                right: 12,
                top: 12,
                color: "#FFFFFF",
                }}
            >
                <CloseIcon />
            </IconButton>
            </DialogTitle>
            <DialogContent>
            <Grid
                container
                spacing={2}
                align="center"
                sx={{ marginTop: "0.25vh" }}
            >
                <Grid item xs={12}>
                <h3 align="left" style={{ marginTop: 0, marginBottom: 0 }}>
                    Color
                </h3>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <HexColorPicker
                    color={lightColor}
                    onChange={(val) => handleLightColor(val)} 
                />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <Box
                    fullWidth
                    height={"100%"}
                    minHeight={"5vh"}
                    bgcolor={lightColor}
                    borderRadius={"10px"}
                />
                </Grid>
                <Grid item xs={12}>
                <h3 align="left" style={{ marginTop: 0, marginBottom: 0 }}>
                    Brightness
                </h3>
                </Grid>
                <Grid item xs={12}>
                <Slider
                    defaultValue={100}
                    onChangeCommitted={(_, val) => props.handleBrightnessChange(val,props.deviceIdx)}
                    valueLabelDisplay="auto"
                    sx={{
                    "& .MuiSlider-thumb": { bgcolor: "#FFC107" },
                    "& .MuiSlider-rail": { color: "#D9A406" },
                    "& .MuiSlider-track": { color: "#FFC107" },
                    }}
                />
                </Grid>
                <Grid item xs={12}>
                <IconButton
                    onClick={() => props.handleLightOnOff(props.deviceIdx)}
                    sx={{
                    bgcolor: props.devices[props.deviceIdx].on ? "#FFC107" : "#DDDEDF",
                    "&:hover": {
                        bgcolor: props.devices[props.deviceIdx].on ? "#D9A406" : "#B6B7B8",
                    },
                    }}
                >
                    <PowerSettingsNewIcon />
                </IconButton>
                </Grid>
            </Grid>
            </DialogContent>
        </Dialog>
    );
  }