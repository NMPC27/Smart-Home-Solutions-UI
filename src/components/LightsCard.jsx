import * as React from 'react';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';


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
]


export default function LightsCard() {

    const [lights, setLights] = React.useState(data)

    const handleLights = (idx)=>{
        let tmp = [...lights]
        tmp[idx].on = !tmp[idx].on
        setLights(tmp)
    }
  
    return (
        <OutItem>
            <h2 style={{ marginTop: "0.5vw", marginBottom: "1vw" }}>Lights</h2>
            <InItem>
                <Grid container spacing={2}>

                    { lights.map( (val, idx) => {
                        return (
                            <Grid item xs={3}>
                                <IconButton
                                    sx={{ 
                                        borderRadius: "10px", 
                                        bgcolor: val.on ? '#FFC107' : '#DDDEDF', 
                                        "&:hover": {bgcolor: val.on ? '#D9A406' : '#B6B7B8'},
                                        padding: "1vw" }} 
                                    onClick={() => handleLights(idx)}
                                >
                                    <LightbulbOutlinedIcon  />
                                </IconButton>

                                {val.name}
                            </Grid>
                        )})
                    }
                </Grid>
            </InItem>
        </OutItem>
    )
}


