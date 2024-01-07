import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Slider from "@mui/material/Slider";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import RoomDeleteConfirmation from "./RoomDeleteConfirmation";
import AddIcon from '@mui/icons-material/Add';
import SettingsDialogAdd from "./SettingsDialogAdd";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#BDC3C7",
    "&:hover": { backgroundColor: "#999DA1" },
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign:"center",
    color: "#FFFFFF",
    borderRadius: "20px",
    aspectRatio: "16/9",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center"
  }));

const ItemAdd = styled(Paper)(({ theme }) => ({
    borderWidth:2,
    borderStyle: 'dashed',
    borderColor:'#95A5A6',
    "&:hover": { backgroundColor: "#E5E7E9" },
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign:"center",
    color: "#95A5A6",
    borderRadius: "20px",
    aspectRatio: "16/9",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center"
  }));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function SettingsDialog(props) {

    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'))

    
    const [openSettingsDialogAdd, setOpenSettingsDialogAdd] = React.useState(false);

    const handleCloseSettingsDialogAdd = () => {
        setOpenSettingsDialogAdd(false)
    };

    return (
        <>
        <Dialog
            fullWidth
            maxWidth={"md"}
            open={props.openSettingsDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => props.handleCloseSettingsDialog()}
            PaperProps={{ sx: { borderRadius: "20px" } }}
        >
            <DialogTitle bgcolor={"#1F2937"} color={"#FFFFFF"}>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
                Settings
            </h3>

            <IconButton
                onClick={() => props.handleCloseSettingsDialog()}
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
            <DialogContent style= { mobile ? {height:"60vh"} : {aspectRatio: "16/9"} } >
            <Grid container spacing={2} marginTop={"0.2vh"}>
                <Grid item xs={12}>
                    <h3 style={{marginTop:"0vh", marginBottom:"0vh"}} >Select order of the cards</h3>
                </Grid>
                { props.cards.map( (val,idx) => {
                    return(
                        <Grid item xs={12} sm={6} md={3}>
                            <Item>                        
                                <b> {val.type} Card </b>
                                <div>
                                <IconButton
                                    onClick={() => props.handleCardDelete(idx)}
                                    sx={{
                                        color: "#FFFFFF",
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                </div>
                            </Item>
                        </Grid>
                    )
                })
                }
            
                <Grid item xs={12} sm={6} md={3}>
                    <ItemAdd elevation={0} >
                        <div>
                        <IconButton
                            onClick={() => setOpenSettingsDialogAdd(true)}
                        >
                            <AddIcon />
                        </IconButton>
                        </div>
                    </ItemAdd>
                </Grid>
            </Grid>
            </DialogContent>
        </Dialog>
        <SettingsDialogAdd 
            openSettingsDialogAdd={openSettingsDialogAdd}
            handleCloseSettingsDialogAdd={handleCloseSettingsDialogAdd}
            handleCardAdd={props.handleCardAdd}
            rooms={props.rooms}
        />
        </>
    );
  }