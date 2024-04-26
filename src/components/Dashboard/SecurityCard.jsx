import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import * as React from "react";

const OutItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#111827",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#FFFFFF",
  borderRadius: "20px",
  height: 160
}));

const InItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "20px",
  height: 40
}));

export default function SecurityCard(props) {

  const handleClickAlarm = () => {
    props.handleClickAlarm(!props.alarmOn);
  };

  React.useEffect(() => {
    for (let i = 0; i < props.devices.length; i++) {
      if (props.devices[i].type === "Motion Sensor") {
        props.handleClickAlarm(props.devices[i].on);
        break;
      }
    }
  }, []);

  return (
    <OutItem elevation={5}>
      <h2 style={{ marginTop: 10, marginBottom: 16 }}>Security</h2>
      <InItem>
        {props.alarmOn ? (
          <Button
            variant="contained"
            fullWidth
            size="large"
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
            size="large"
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
