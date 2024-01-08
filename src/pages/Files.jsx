import AppBarStyled from "../components/AppBar/AppBarStyled";
import FilesTable from "../components/Files/FilesTable";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { getFiles } from "../components/API";

export default function Files() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  let navigate = useNavigate();

  React.useEffect(() => {
    if (mobile) {
      document.body.style.margin = 0;
    }
  }, [mobile]);

  React.useEffect(() => {
    getFiles("/").then(
      () => {},
      () => {
        navigate("/");
      },
    );
  }, []);

  return (
    <>
      <AppBarStyled navbar={"files"} />

      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12}>
          <FilesTable />
        </Grid>
      </Grid>
    </>
  );
}
