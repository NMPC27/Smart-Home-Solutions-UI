import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import RoomDeleteConfirmation from "./RoomDeleteConfirmation";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1F2937",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#FFFFFF",
  borderRadius: "20px",
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RoomDialog(props) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [roomName, setRoomName] = React.useState("");
  const [roomNewName, setRoomNewName] = React.useState("");
  const [editIdx, setEditIdx] = React.useState(-1);

  const [openRoomDeleteConfirmation, setOpenRoomDeleteConfirmation] =
    React.useState(false);
  const [deleteIdx, setDeleteIdx] = React.useState(-1);

  const [openErrorMsg1, setOpenErrorMsg1] = React.useState(false); // room already exists
  const [openErrorMsg2, setOpenErrorMsg2] = React.useState(false); // empty name
  const [openSuccessMsg, setOpenSuccessMsg] = React.useState(false); // room addded

  const handleRoomAdd = (roomName) => {
    if (roomName === "") {
      setOpenErrorMsg2(true);
      return;
    }

    for (let i = 0; i < props.rooms.length; i++) {
      if (props.rooms[i].name === roomName) {
        setOpenErrorMsg1(true);
        return;
      }
    }

    props.handleRoomAdd(roomName);
    setOpenSuccessMsg(true);
  };

  const handleDeleteRoom = (idx) => {
    setDeleteIdx(idx);
    setOpenRoomDeleteConfirmation(true);
  };

  const handleEditRoom = (idx) => {
    setEditIdx(idx);
  };

  const handleKeyDown = (event,idx) => {
    if (event.key === "Enter") {
      editRoomName(idx);
    }
  };

  const editRoomName = (idx) => {
    setEditIdx(-1)
    props.editRoomName(idx,roomNewName);
  };

  const handleCloseRoomDeleteConfirmation = () => {
    setOpenRoomDeleteConfirmation(false);
  };

  const handleCloseRoomDeleteConfirmationOK = () => {
    setOpenRoomDeleteConfirmation(false);
    props.handleDeleteRoom(deleteIdx);
    setDeleteIdx(-1);
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth={"md"}
        open={props.openRoomDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => props.handleCloseRoomDialog()}
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        <DialogTitle bgcolor={"#1F2937"} color={"#FFFFFF"}>
          <h3 style={{ marginTop: 0, marginBottom: 0 }}>Rooms</h3>

          <IconButton
            onClick={() => props.handleCloseRoomDialog()}
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
          <Grid
            container
            spacing={2}
            align="center"
            sx={{ marginTop: "0.25vh" }}
          >
            {!mobile && (
              <Grid item xs={12} sm={6} md={6} height={"25vh"}></Grid>
            )}
            <Grid item xs={12} sm={6} md={6} position={!mobile && "absolute"}>
              <Stack spacing={2} alignItems="center" justifyContent="center">
                <h3>Add New Room:</h3>
                <TextField
                  onChange={(e) => setRoomName(e.target.value)}
                  label="Room Name"
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  sx={{ fontWeight: "bold", width: "50%" }}
                  onClick={() => handleRoomAdd(roomName)}
                >
                  + ADD
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Stack spacing={2} maxHeight={"45vh"}>
                <h3>Rooms:</h3>

                {props.rooms.map((room, idx) => (
                  <Item key={idx}>
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        { editIdx === idx ?
                          <IconButton
                            onClick={() => setEditIdx(-1)}
                            sx={{
                              color: "#FFFFFF",
                            }}
                          >
                            <ClearIcon />
                          </IconButton>
                          :
                          <IconButton
                              onClick={() => handleEditRoom(idx)}
                              sx={{
                                color: "#FFFFFF",
                              }}
                            >
                            <EditIcon />
                          </IconButton>
                        }                      
                      </Grid>
                      <Grid item xs={8}>
                        { editIdx === idx ?
                            <TextField
                              label="Room Name"
                              variant="outlined"
                              size="small"
                              sx={{
                                width: "100%",
                                backgroundColor: "#374151",
                                borderRadius: "10px",
                                borderColor: "#FFFFFF",
                                svg: { color: "#FFFFFF" },
                                input: { color: "#FFFFFF" },
                                label: { color: "#FFFFFF" },
                              }}
                              onChange={(e) => setRoomNewName(e.target.value)}
                              onKeyDown={(e) => handleKeyDown(e,idx)}
                            />
                          :
                          <h3
                            style={{
                              textAlign: "left",
                              marginTop: "1vh",
                              marginBottom: "1vh",
                              marginLeft: "0.5vw",
                            }}
                          >
                            {room.name}
                          </h3>
                        }                        
                      </Grid>
                      <Grid item xs={2}>
                        { editIdx === idx ?
                          <IconButton
                            onClick={() => editRoomName(idx)}
                            sx={{
                              color: "#FFFFFF",
                            }}
                          >
                            <CheckIcon />
                          </IconButton>                          
                        :
                          <IconButton
                            onClick={() => handleDeleteRoom(idx)}
                            sx={{
                              color: "#FFFFFF",
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }                        
                      </Grid>
                    </Grid>
                  </Item>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {deleteIdx !== -1 && (
        <RoomDeleteConfirmation
          openRoomDeleteConfirmation={openRoomDeleteConfirmation}
          handleCloseRoomDeleteConfirmation={handleCloseRoomDeleteConfirmation}
          handleCloseRoomDeleteConfirmationOK={
            handleCloseRoomDeleteConfirmationOK
          }
          deleteIdx={deleteIdx}
          rooms={props.rooms}
          devices={props.devices}
        />
      )}

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openErrorMsg1}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason !== "clickaway") {
            setOpenErrorMsg1(false);
          }
        }}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={(event, reason) => {
            if (reason !== "clickaway") {
              setOpenErrorMsg1(false);
            }
          }}
        >
          This room already exists!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openErrorMsg2}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason !== "clickaway") {
            setOpenErrorMsg2(false);
          }
        }}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={(event, reason) => {
            if (reason !== "clickaway") {
              setOpenErrorMsg2(false);
            }
          }}
        >
          Room name is empty!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSuccessMsg}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason !== "clickaway") {
            setOpenSuccessMsg(false);
          }
        }}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClose={(event, reason) => {
            if (reason !== "clickaway") {
              setOpenSuccessMsg(false);
            }
          }}
        >
          Room added!
        </Alert>
      </Snackbar>
    </>
  );
}


