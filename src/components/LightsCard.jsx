import * as React from 'react';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Slider from '@mui/material/Slider';
import CloseIcon from '@mui/icons-material/Close';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { HexColorPicker } from "react-colorful";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';


const OutItem = styled(Paper)(({ theme }) => ({
    backgroundColor: "#1F2937",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "#FFFFFF",
    borderRadius: "20px"
  }));

const InItem = styled(Paper)(({ theme }) => ({
    backgroundColor: "#FFFFFF",
    ...theme.typography.body2,
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: "20px"
  }));

const Transition = React.forwardRef(function Transition(props, ref) {
return <Slide direction="up" ref={ref} {...props} />;
});


const data = [
    {
        id: 1,
        name: "Kitchen",
        on: true,
        brightness: 100,
        color: "#FFFFFF"
    },
    {
        id: 2,
        name: "Bedroom",
        on: false,
        brightness: 100,
        color: "#FFFFFF"
    },
    {
        id: 3,
        name: "Bedroom#2",
        on: false,
        brightness: 100,
        color: "#FFFFFF"
    },
    {
        id: 4,
        name: "Bedroom#3",
        on: false,
        brightness: 100,
        color: "#FFFFFF"
    },
    {
        id: 5,
        name: "Bed 1",
        on: false,
        brightness: 100,
        color: "#FFFFFF"
    },
    {
        id: 6,
        name: "Bed 2",
        on: false,
        brightness: 100,
        color: "#FFFFFF"
    },
]


export default function LightsCard() {

    const [lights, setLights] = React.useState(data)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [selectedLight, setSelectedLight] = React.useState(0)
    const [lightColor, setLightColor] = React.useState("#1F2937")


    const handleOpenDialog = (e,idx)=>{
        e.preventDefault();
        setSelectedLight(idx)
        setOpenDialog(true);
    }

    const handleApplyDialog = () => {
        setOpenDialog(false);
    };

    const handleLightColor = (val) => {
        setLightColor(val)
        //! API CALL - atençao isto vai criar muitas API calls !!!

        let tmp = [...lights]
        tmp[selectedLight].color = val
        setLights(tmp)
    };

    const handleBrightnessChange = (val) => {
        //! API CALL


        let tmp = [...lights]
        tmp[selectedLight].brightness = val
        setLights(tmp)
    };

    const handleLightOnOff = (idx) => {
        //! API CALL

        let tmp = [...lights]
        tmp[idx].on = !tmp[idx].on
        setLights(tmp)
    };


    return (
        <OutItem elevation={5}>
            <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>Lights</h2>
            <InItem>
                <Grid container spacing={4}>

                    { lights.map( (val, idx) => {
                        return (
                            <Grid item xs={4}>
                                <Stack spacing={2}>

                                    <IconButton
                                        sx={{ 
                                            borderRadius: "10px", 
                                            bgcolor: val.on ? '#FFC107' : '#DDDEDF', 
                                            "&:hover": {bgcolor: val.on ? '#D9A406' : '#B6B7B8'},
                                            padding: "1vw" 
                                        }} 
                                        onClick={() => handleLightOnOff(idx)}
                                        onContextMenu={(e)=> handleOpenDialog(e,idx)}
                                    >
                                        <LightbulbOutlinedIcon  />
                                    </IconButton>

                                    
                                    <b style={{ marginTop: 8 }}>{val.name}</b>

                                </Stack>
                            </Grid>
                        )})
                    }
                </Grid>
            </InItem>

            <Dialog
                fullWidth
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpenDialog(false) }
                PaperProps={{ sx: { borderRadius: "20px" } }}
            >
                <DialogTitle bgcolor={"#1F2937"} color={"#FFFFFF"}>
                    <h3 style={{ marginTop: 0, marginBottom: 0 }}> { lights[selectedLight].name } Light </h3>
                    
                    <IconButton
                    onClick={() => setOpenDialog(false)}
                    sx={{
                        position: 'absolute',
                        right: 12,
                        top: 12,
                        color: '#FFFFFF',
                    }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>

                <Grid container spacing={2} align="center" sx={{ marginTop:"0.25vh"}}>
                    <Grid item xs={12}>
                        <h3 align="left" style={{ marginTop: 0, marginBottom: 0 }}>Color</h3>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <HexColorPicker color={lightColor} onChange={(val)=> handleLightColor(val)} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Box fullWidth height={"100%"} minHeight={"5vh"} bgcolor={lightColor} borderRadius={"10px"}/>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 align="left" style={{ marginTop: 0, marginBottom: 0 }}>Brightness</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <Slider 
                            defaultValue={lights[selectedLight].brightness} 
                            onChangeCommitted={ (_, val) => handleBrightnessChange(val)}
                            valueLabelDisplay="auto" 
                            sx={{ 
                                "& .MuiSlider-thumb": {bgcolor: '#FFC107' },
                                "& .MuiSlider-rail": {color: '#D9A406'},
                                "& .MuiSlider-track": {color: '#FFC107'},
                            }} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <IconButton
                        onClick={() => handleLightOnOff(selectedLight) }
                        sx={{
                            bgcolor: lights[selectedLight].on ? '#FFC107' : '#DDDEDF', 
                            "&:hover": {bgcolor: lights[selectedLight].on ? '#D9A406' : '#B6B7B8'},
                        }}
                        >
                            <PowerSettingsNewIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                    

                </DialogContent>
            </Dialog>

        </OutItem>
    )
}


