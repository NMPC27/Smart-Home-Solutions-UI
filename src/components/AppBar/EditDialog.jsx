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

    // const [numCol, setNumCol] = React.useState(() => {
  const [numCol, ] = React.useState(() => {
    if (mobile){
      return 1;
    }else if(tablet){
      return 2;
    }else{
      return 12;
    }
  });

  const dialogGrid = React.useCallback((node) => {
    //! Resize grid
    if (node !== null) {
      setSize(node.getBoundingClientRect().width);
    }
  }, []);

  const [openEditDialogAdd, setOpenEditDialogAdd] =
    React.useState(false);

  const handleCloseEditDialogAdd = () => {
    setOpenEditDialogAdd(false);
  };

  const handleLayoutChange = (currentLayout) => {

    const newLayout = []

    for (let i = 0; i < props.cards.length; i++) {
      newLayout.push({
        type: props.cards[i].type, 
        room: props.cards[i].room,
        i: ''+i,
        x: currentLayout[i].x,
        y: currentLayout[i].y,
        w: currentLayout[i].w,
        h: currentLayout[i].h,
      })
    }

    props.handleSetLayout(newLayout)
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
            <Grid item xs={mobile ? 12 : 10}>
              <h3 style={{ marginTop: "1.6vh", marginBottom: "0vh" }}>
                Select order of the cards
              </h3>
            </Grid>
            <Grid item xs={ mobile ? 12 : 2} textAlign={mobile ? 'center' : "right"}>
              <Button
                variant="contained"
                sx={{ fontWeight: "bold", marginTop: "1vh", marginBottom: "0vh"}}
                onClick={() => setOpenEditDialogAdd(true)}                
              >
                + Card
              </Button>
            </Grid>
          </Grid>

          <GridLayout 
            className="layout" 
            cols={numCol} 
            margin={[30, 30]} 
            rowHeight={100} 
            width={size-70} 
            isResizable={false}
            layout={props.cards}
            onLayoutChange={ (currentLayout) => handleLayoutChange(currentLayout) }
          >
            {props.cards.map((val, idx) => {
              return (
                  <Item key={val.i}>
                    <b className="prevent-select"> {val.type} Card </b>
                    <div>
                      <IconButton
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        onClick={() => props.handleCardDelete(idx)}
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
    }),
  ).isRequired,
};
