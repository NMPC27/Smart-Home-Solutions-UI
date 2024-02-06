import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import EditDialogAdd from "./EditDialogAdd";
import GridLayout from "react-grid-layout";
import Button from "@mui/material/Button";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ButtonGroup from '@mui/material/ButtonGroup';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#BDC3C7",
  "&:hover": { backgroundColor: "#999DA1" },
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#FFFFFF",
  borderRadius: "20px",
  aspectRatio: "16/9",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditDialog(props) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));

  const [size, setSize] = React.useState(null);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const [device, setDevice] = React.useState(()=>{
    if (mobile) { return "mobile" }
    else if (tablet) { return "tablet" }
    else { return "pc" }
  });

  const [numCol,setNumCol] = React.useState(() => {
    if (mobile) { return 1 } 
    else if (tablet) { return 2 } 
    else { return 4 }
  });

  const dialogGrid = React.useCallback((node) => {
    //! Resize grid
    if (node !== null) {
      setSize(node.getBoundingClientRect().width);
    }
  }, []);

  const [openEditDialogAdd, setOpenEditDialogAdd] = React.useState(false);

  const handleCloseEditDialogAdd = () => {
    setOpenEditDialogAdd(false);
  };

  const handleLayoutChange = (currentLayout) => {
    const newLayout = [];

    for (let i = 0; i < props.cards[device][selectedTab].length; i++) {
      newLayout.push({
        type: props.cards[device][selectedTab][i].type,
        room: props.cards[device][selectedTab][i].room,
        i: "" + i,
        x: currentLayout[i].x,
        y: currentLayout[i].y,
        w: currentLayout[i].w,
        h: currentLayout[i].h,
      });
    }


    props.handleSetLayout(device,selectedTab,newLayout);

  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth={"md"}
        open={props.openEditDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => props.handleCloseEditDialog()}
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        <DialogTitle bgcolor={"#1F2937"} color={"#FFFFFF"}>
          <h3 style={{ marginTop: 0, marginBottom: 0 }}>Edit</h3>

          <IconButton
            onClick={() => props.handleCloseEditDialog()}
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
        <DialogContent
          style={mobile ? { height: "60vh" } : { aspectRatio: "16/9" }}
          ref={dialogGrid}
        >
          <Grid container spacing={2}>
            <Grid item xs={mobile ? 12 : 8}>
              <h3 style={{ marginTop: "1.6vh", marginBottom: "0vh" }}>
                Select order of the cards
              </h3>
            </Grid>
            <Grid
              item
              xs={mobile ? 12 : 4}
              textAlign={mobile ? "center" : "right"}
            >
              <Button
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  marginTop: "1vh",
                  marginBottom: "0vh",                  
                }}
                onClick={() => props.handleAddDashboard(device)}
              >
                + Dashboard
              </Button>
              <Button
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  marginTop: "1vh",
                  marginBottom: "0vh",
                  marginLeft: "1vw"
                }}
                onClick={() => setOpenEditDialogAdd(true)}
              >
                + Card
              </Button>              
            </Grid>
            <Grid item xs={12} sx={{textAlign: "center"}}>

              <ButtonGroup>
                <Button variant={device==="pc" ? "contained" : "outlined"} sx={{fontWeight: 'bold'}} onClick={()=>{setDevice("pc");setNumCol(4)}}>PC</Button>
                <Button variant={device==="tablet" ? "contained" : "outlined"} sx={{fontWeight: 'bold'}} onClick={()=>{setDevice("tablet");setNumCol(2)}}>Tablet</Button>
                <Button variant={device==="mobile" ? "contained" : "outlined"} sx={{fontWeight: 'bold'}} onClick={()=>{setDevice("mobile");setNumCol(1)}}>Mobile</Button>
              </ButtonGroup>

            </Grid>
            <Grid item xs={12}>
              <Tabs 
                value={selectedTab} 
                onChange={(event, newValue) => setSelectedTab(newValue)}
              >
                {props.cards[device].map((card, idx) => {
                  return <Tab label={"Dashboard "+idx} value={idx} style={{fontWeight:"bold"}}/>
                })
                }
              </Tabs>
            </Grid>
            
          </Grid>

          <GridLayout
            className="layout"
            cols={numCol}
            margin={[30, 30]}
            rowHeight={100}
            width={size - 70}
            isResizable={false}
            layout={props.cards[device][selectedTab]}
            onLayoutChange={(currentLayout) =>
              handleLayoutChange(currentLayout)
            }
          >
            {props.cards[device][selectedTab].map((val, idx) => {
              return (
                <Item key={val.i}>
                  <b className="prevent-select"> {val.type} Card </b>
                  <div>
                    <IconButton
                      onMouseDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      onClick={() => props.handleCardDelete(device,selectedTab,idx)}
                      sx={{
                        color: "#FFFFFF",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </Item>
              );
            })}
          </GridLayout>
        </DialogContent>
      </Dialog>
      <EditDialogAdd
        openEditDialogAdd={openEditDialogAdd}
        handleCloseEditDialogAdd={handleCloseEditDialogAdd}
        handleCardAdd={props.handleCardAdd}
        rooms={props.rooms}
        selectedTab={selectedTab}
        device={device}
      />
    </>
  );
}

import PropTypes from "prop-types";

EditDialog.propTypes = {
  openEditDialog: PropTypes.bool.isRequired,
  handleCloseEditDialog: PropTypes.func.isRequired,
  handleCardDelete: PropTypes.func.isRequired,
  handleCardAdd: PropTypes.func.isRequired,
  handleSetLayout: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      room: PropTypes.string.isRequired,
      i: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      w: PropTypes.number.isRequired,
      h: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
