import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import * as React from "react";

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

export default function SecurityCard(props) {
  const [alarmOn, setAlarmOn] = React.useState(() => {
    for(let i=0;i<props.devices.length;i++){
      if (props.devices[i].type === "Motion Sensor"){
        return props.devices[i].on
      }
    }
  });

  const handleClickAlarm = () => {
    props.handleClickAlarm(!alarmOn);

    setAlarmOn(!alarmOn);
  };

  return (
    <OutItem elevation={5}>
      <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>Security</h2>
      <InItem>
        {alarmOn ? (
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#C7F7C7",
              color: "#0D4A0D",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#A8D1A8" },
            }}
            onClick={handleClickAlarm}
          >
            Armed
          </Button>
        ) : (
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#F7C5C5",
              color: "#7D1212",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#D1A7A7" },
            }}
            onClick={handleClickAlarm}
          >
            Unarmed
          </Button>
        )}
      </InItem>
    </OutItem>
  );
}
