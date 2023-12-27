import AppBarStyled from "../components/AppBarStyled";
import FilesTable from "../components/FilesTable";
import Grid from "@mui/material/Grid";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import * as React from "react";

export default function Files() {

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'))

  React.useEffect(()  => {
    if (mobile){
      document.body.style.margin = 0
    }
  },[mobile]);

  return (
    <>
      <AppBarStyled navbar={"files"}/>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12}>
          <FilesTable />
        </Grid>
      </Grid>
    </>
  );
}
