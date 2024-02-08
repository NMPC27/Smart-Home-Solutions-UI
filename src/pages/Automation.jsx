import AppBarStyled from "../components/AppBar/AppBarStyled";
import Grid from "@mui/material/Grid";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Flow from "../components/Automation/Flow";
import Nodes from "../components/Automation/Nodes";


export default function Automation() {
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
      <AppBarStyled navbar={"automation"} />

      <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={3}>
            <Nodes />
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Flow />
          </Grid>
      </Grid>
    </>    
  );
}
