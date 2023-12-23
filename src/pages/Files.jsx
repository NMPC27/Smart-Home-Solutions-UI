import AppBarStyled from "../components/AppBarStyled";
import FilesTable from "../components/FilesTable";
import Grid from "@mui/material/Grid";

export default function Files() {
  return (
    <>
      <AppBarStyled />

      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12}>
          <FilesTable />
        </Grid>
      </Grid>
    </>
  );
}
