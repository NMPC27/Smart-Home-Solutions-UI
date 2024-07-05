import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CameraDialog(props) {
  return (
    <Dialog
      fullWidth
      maxWidth={"lg"}
      open={props.openDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => props.handleCloseDialog()}
      PaperProps={{ sx: { borderRadius: "20px" } }}
    >
      <DialogTitle bgcolor={"#111827"} color={"#FFFFFF"}>
        <h3 style={{ marginTop: 0, marginBottom: 0 }}>{props.name} Camera</h3>

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
        <Grid container spacing={2} align="center" sx={{ marginTop: "0.25vh" }}>
          <Grid item xs={12}>
            <img
              width="100%"
              style={{ aspectRatio: "16/9", borderRadius: "10px" }}
              src={`data:image/jpeg;base64,${props.fullImg}`}
              alt="Camera"
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

import PropTypes from "prop-types";

CameraDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  fullImg: PropTypes.string.isRequired,
};
