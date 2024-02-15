import AppBarStyled from "../components/AppBar/AppBarStyled";
import Grid from "@mui/material/Grid";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Devices from "../components/Building/Devices";
import Draw from "../components/Building/Draw";
import ReactFlow, { ReactFlowProvider } from 'reactflow';


export default function Building() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  let navigate = useNavigate();

  React.useEffect(() => {
    if (mobile) {
      document.body.style.margin = "1vw";
    }
  }, [mobile]);

  return (
    <>
      <AppBarStyled navbar={"building"} />

      <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={3}>
            <Devices />
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <ReactFlowProvider>
              <Draw />
            </ReactFlowProvider>
          </Grid>
      </Grid>
    </>    
  );
}
