import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import * as React from 'react';

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

export default function SecurityCard() {

    const [alarmOn, setAlarmOn] = React.useState(false)

    const handleClickAlarm = () => {
        console.log(alarmOn)
        setAlarmOn(!alarmOn)
    };
  
    return (
        <OutItem elevation={5}>
            <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>Security</h2>
            <InItem>
                {
                    alarmOn ? 
                        <Button variant="contained" fullWidth sx={{ bgcolor: "#E3FBE3", color:"#0D4A0D" }} onClick={handleClickAlarm}>Armed</Button>
                    :
                        <Button variant="outlined" fullWidth sx={{ }}  onClick={handleClickAlarm}>Unarmed</Button>
                }
            </InItem>
        </OutItem>
    )
}
