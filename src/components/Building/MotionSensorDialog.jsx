import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
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
import Button from "@mui/material/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MotionSensorDialog(props) {

  const [alarmOn, setAlarmOn] = React.useState(props.devices[props.deviceIdx].on);

  const handleClickAlarm = () => {
    props.handleClickAlarm(!alarmOn, props.deviceIdx);

    setAlarmOn(!alarmOn);
  };

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
          {props.devices[props.deviceIdx].name} Sensor
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
      {alarmOn ? (
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              marginTop: "2vh",
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
              marginTop: "2vh",
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
      </DialogContent>
    </Dialog>
  );
}

