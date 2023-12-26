import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
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


export default function CameraCard(props) {
  const [selectedCameraIdx, setSelectedCameraIdx] = React.useState(0);

  const handleCameraChange = (val) => {
    setSelectedCameraIdx(val);
  };

  React.useEffect(() => {
    for(let i=0;i<props.devices.length;i++){
      if (props.devices[i].type === "camera"){
        setSelectedCameraIdx(i);
        break;
      }
    }
  },[]);

  return (
    <OutItem elevation={5}>
      <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>Camera</h2>
      <InItem>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Camera</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCameraIdx}
                label="Camera"
                onChange={(event) => handleCameraChange(event.target.value)}
              >
                {props.devices.map((device, idx) => {
                  if (device.type === "camera") {
                    return(
                      <MenuItem key={idx} value={idx}>{device.name}</MenuItem>
                    );    
                  }              
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <img
              width="100%"
              style={{ marginTop: "2vh", borderRadius: "20px" }}
              src={props.devices[selectedCameraIdx].endpoint}
              alt="ERROR!"
            />
          </Grid>
        </Grid>
      </InItem>
    </OutItem>
  );
}
