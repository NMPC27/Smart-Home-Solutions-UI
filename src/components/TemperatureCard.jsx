import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import CircularSlider from "react-circular-slider-svg";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

const OutItem = styled(Paper)(({ theme }) => ({
    backgroundColor: "#1F2937",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: "#FFFFFF",
    borderRadius: "10px"
  }));

const InItem = styled(Paper)(({ theme }) => ({
    backgroundColor: "#FFFFFF",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: "10px"
  }));

  const colorsArray = [
    '#2196f3',  // 15
    '#216ef4',  // 16
    '#2145f5',  // 17
    '#2621f6',  // 18
    '#5021f6',  // 19
    '#7921f7',
    '#a321f8',  // 21
    '#cd21f9',
    '#f821fa',  // 23
    '#fa21d2',
    '#fb22a8',  // 25
    '#fc227f',
    '#fd2255',  // 27
    '#fd222a',
    '#fe4422',  // 29
    '#ff6f22'   // 30
  ];


const data = [
    {
        id: 1,
        name: "Kitchen",
        on: true,
        currentTemperature: 10,
        targetTemperature: 23,
    },
    {
        id: 2,
        name: "Bed",
        on: false,
        currentTemperature: 7,
        targetTemperature: 20,
    },
]

export default function TemperatureCard() {

    const [selectedRoomIdx, setSelectedRoomIdx] = React.useState(0) //! ERROR IF NULL
    const [rooms, setRooms] = React.useState(data)

    const [targetTemperature, setTargetTemperature] = React.useState(rooms[selectedRoomIdx].targetTemperature);
    const [arcColor, setArcColor] = React.useState(colorsArray[targetTemperature-15])


    const handleRoomChange = (val) => {
        setSelectedRoomIdx(val)

        if (rooms[val].on){
            setTargetTemperature(rooms[val].targetTemperature)
            setArcColor(colorsArray[rooms[val].targetTemperature-15])
        } else {
            setTargetTemperature(15)
            setArcColor(colorsArray[0])
        }
        
    };
    
    const handleTemperatureOnOff = () => {
        //! API CALL

        let tmp = [...rooms]
        tmp[selectedRoomIdx].on = !tmp[selectedRoomIdx].on
        setRooms(tmp)


        if (rooms[selectedRoomIdx].on){
            setTargetTemperature(rooms[selectedRoomIdx].targetTemperature)
            setArcColor(colorsArray[rooms[selectedRoomIdx].targetTemperature-15])
        } else {
            setTargetTemperature(15)
            setArcColor(colorsArray[0])
        }
    };

    const handleTemperatureTarget = (val) => {
        const newTemp = parseInt(val)
        //! API CALL

        let tmp = [...rooms]
        tmp[selectedRoomIdx].targetTemperature = newTemp
        setRooms(tmp)
    };

    
    const handlePlusTemperature = () => {
        const newTemp = parseInt(targetTemperature+1)
        if (rooms[selectedRoomIdx].on){
            if (newTemp<=30){
                setTargetTemperature(newTemp)
                setArcColor(colorsArray[newTemp-15])


                //! API CALL

                let tmp = [...rooms]
                tmp[selectedRoomIdx].targetTemperature = newTemp
                setRooms(tmp)
            }
        }
    };

    const handleMinusTemperature = () => {
        const newTemp = parseInt(targetTemperature-1)
        if (rooms[selectedRoomIdx].on){
            if (newTemp>=15){
                setTargetTemperature(newTemp)
                setArcColor(colorsArray[newTemp-15])


                //! API CALL

                let tmp = [...rooms]
                tmp[selectedRoomIdx].targetTemperature = newTemp
                setRooms(tmp)
            }
        }
    };

    return (
        <OutItem>
            <h2 style={{ marginTop: "0.5vw", marginBottom: "1vw" }}>Temperature</h2>
            <InItem>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Room</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedRoomIdx}
                            label="AAAA"
                            onChange={(event) => handleRoomChange(event.target.value)}
                        >
                            {
                                rooms.map((room,idx) => (
                                    <MenuItem value={idx}>{room.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <CircularSlider
                        disabled={!rooms[selectedRoomIdx].on}
                        size={300}
                        trackWidth={10}
                        handleSize={10}
                        minValue={15}
                        maxValue={30}
                        startAngle={50}
                        endAngle={310}
                        handle1={{
                            value: targetTemperature,
                            onChange: v => {setTargetTemperature(v); setArcColor(colorsArray[parseInt(v)-15])}
                        }}
                        onControlFinished={() => handleTemperatureTarget(targetTemperature)}
                        arcColor={arcColor}
                        arcBackgroundColor="#AAAAAA"
                    />
                    <div style={{ marginTop:"-16vw"}} >
                        
                        { 
                            rooms[selectedRoomIdx].on ? 
                                <h2>Target {parseInt(targetTemperature)}°</h2>
                            :
                                <h2>OFF</h2>
                        }
                        
                        <Divider alignItems="center" sx={{ borderBottomWidth: 5, width:"50%", margin:"auto", bgcolor:"#AAAAAA", borderRadius: "5px" }}/>
                        <h2>Now {rooms[selectedRoomIdx].currentTemperature}°</h2>                 
                    
                        <Stack justifyContent="center" direction="row" spacing={4}>
                            <IconButton
                                onClick={() => handleMinusTemperature() }
                                sx={{
                                    bgcolor: '#2196F3', 
                                    "&:hover": {bgcolor: '#1C7ECC'},
                                }}
                                >
                                    <RemoveIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => handlePlusTemperature() }
                                sx={{
                                    bgcolor: '#FF6F22', 
                                    "&:hover": {bgcolor: '#D95E1D'},
                                }}
                                >
                                    <AddIcon />
                            </IconButton>
                        </Stack>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <IconButton
                        onClick={() => handleTemperatureOnOff() }
                        sx={{
                            bgcolor: rooms[selectedRoomIdx].on ? '#FFC107' : '#DDDEDF', 
                            "&:hover": {bgcolor: rooms[selectedRoomIdx].on ? '#D9A406' : '#B6B7B8'},
                        }}
                        >
                            <PowerSettingsNewIcon />
                    </IconButton>
                </Grid>
            </Grid>
                
            

            </InItem>
        </OutItem>
    )
}