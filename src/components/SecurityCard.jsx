import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import * as React from 'react';

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
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: "10px"
  }));

export default function SecurityCard() {

    const [alarmOn, setAlarmOn] = React.useState(false)

    const handleClickAlarm = () => {
        console.log(alarmOn)
        setAlarmOn(!alarmOn)
    };
  
    return (
        <OutItem elevation={5}>
            <h2 style={{ marginTop: "0.5vw", marginBottom: "1vw" }}>Security</h2>
            <InItem>
                {
                    alarmOn ? 
                        <Button variant="contained" sx={{ width: "12vw", bgcolor: "#E3FBE3", color:"#0D4A0D" }} onClick={handleClickAlarm}>Armed</Button>
                    :
                        <Button variant="outlined" sx={{ width: "12vw" }}  onClick={handleClickAlarm}>Unarmed</Button>
                }
            </InItem>
        </OutItem>
    )
}
