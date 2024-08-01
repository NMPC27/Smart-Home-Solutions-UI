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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ButtonGroup from "@mui/material/ButtonGroup";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  const bottom = React.useRef(null);

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("xl"));

  const [scroll, setScroll] = React.useState(false);

  React.useEffect(() => {
    if (bottom.current === null) {
      return;
    }

    if (scroll) {
      bottom.current.scrollIntoView({ behavior: "smooth" });
      setScroll(false);
    }
  }, [props.cards]);

  const handleCardAdd = (device, selectedTab, selectedType) => {
    props.handleCardAdd(device, selectedTab, selectedType);
    setScroll(true);
  };

  const [openErrorMsg1, setOpenErrorMsg1] = React.useState(false); // must have at least one dashboard
  const [openSuccessMsg, setOpenSuccessMsg] = React.useState(false); // dashboard added

  const [size, setSize] = React.useState(null);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const [device, setDevice] = React.useState(() => {
    if (mobile) {
      return "mobile";
    } else if (tablet) {
      return "tablet";
    } else {
      return "pc";
    }
  });

  const [deviceChange, setDeviceChange] = React.useState(false);
  const [firstLoad, setFirstLoad] = React.useState(true);

  React.useEffect(() => {
    if (mobile) {
      setDevice("mobile");
      setNumCol(1);
      if (!firstLoad) {
        setDeviceChange(true);
      }
    } else if (tablet) {
      setDevice("tablet");
      setNumCol(2);
      if (!firstLoad) {
        setDeviceChange(true);
      }
    } else {
      setDevice("pc");
      setNumCol(4);
      if (!firstLoad) {
        setDeviceChange(true);
      }
    }
  }, [mobile, tablet]);

  const [numCol, setNumCol] = React.useState(() => {
    if (mobile) {
      return 1;
    } else if (tablet) {
      return 2;
    } else {
      return 4;
    }
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
    setChangingCards(true);
  };

  const [changingTab, setChangingTab] = React.useState(false);
  const [changingCards, setChangingCards] = React.useState(false);

  const handleLayoutChange = (currentLayout) => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    if (deviceChange) {
      setDeviceChange(false);
      return;
    }
    if (changingTab) {
      setChangingTab(false);
      return;
    }
    if (changingCards) {
      setChangingCards(false);
      return;
    }

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

    props.handleSetLayout(device, selectedTab, newLayout);
  };

  const handleCardDeleteMobile = (e, device, selectedTab, idx) => {
    e.stopPropagation();
    props.handleCardDelete(device, selectedTab, idx);
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={props.openEditDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => props.handleCloseEditDialog()}
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        <DialogTitle bgcolor={"#111827"} color={"#FFFFFF"}>
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
        <DialogContent style={{ minHeight: "60vh" }} ref={dialogGrid}>
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
                onClick={() => {
                  props.handleAddDashboard(device);
                  setOpenSuccessMsg(true);
                }}
              >
                + Dashboard
              </Button>
              <Button
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  marginTop: "1vh",
                  marginBottom: "0vh",
                  marginLeft: "1vw",
                }}
                onClick={() => setOpenEditDialogAdd(true)}
              >
                + Card
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <ButtonGroup>
                <Button
                  variant={device === "pc" ? "contained" : "outlined"}
                  sx={{ fontWeight: "bold" }}
                  onClick={() => {
                    setDevice("pc");
                    setNumCol(4);
                    setSelectedTab(0);
                    setChangingTab(true);
                  }}
                >
                  PC
                </Button>
                <Button
                  variant={device === "tablet" ? "contained" : "outlined"}
                  sx={{ fontWeight: "bold" }}
                  onClick={() => {
                    setDevice("tablet");
                    setNumCol(2);
                    setSelectedTab(0);
                    setChangingTab(true);
                  }}
                >
                  Tablet
                </Button>
                <Button
                  variant={device === "mobile" ? "contained" : "outlined"}
                  sx={{ fontWeight: "bold" }}
                  onClick={() => {
                    setDevice("mobile");
                    setNumCol(1);
                    setSelectedTab(0);
                    setChangingTab(true);
                  }}
                >
                  Mobile
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12}>
              <Tabs
                value={selectedTab}
                onChange={(event, newValue) => {
                  setSelectedTab(newValue);
                  setChangingTab(true);
                }}
                variant="scrollable"
                scrollButtons="auto"
              >
                {props.cards[device].map((card, idx) => {
                  return (
                    <Tab
                      label={
                        <span>
                          Dashboard {idx}
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (props.cards[device].length === 1) {
                                setOpenErrorMsg1(true);
                              } else {
                                let tab = idx - 1;
                                if (tab < 0) {
                                  tab = 0;
                                }
                                setSelectedTab(tab);
                                setChangingTab(true);

                                props.handleDeleteDashboard(device, idx);
                              }
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </span>
                      }
                      value={idx}
                      style={{ fontWeight: "bold" }}
                      key={idx}
                    />
                  );
                })}

                <Tab
                  label={"+ Add"}
                  value={props.cards[device].length}
                  style={{ fontWeight: "bold" }}
                  onClick={() => props.handleAddDashboard(device)}
                />
              </Tabs>
            </Grid>
          </Grid>

          <GridLayout
            style={{ marginLeft: -40, marginRight: 40 }}
            className="layout"
            cols={numCol}
            margin={[40, 40]}
            rowHeight={100}
            width={size + 10}
            isResizable={false}
            layout={props.cards[device][selectedTab]}
            onLayoutChange={(currentLayout) =>
              handleLayoutChange(currentLayout)
            }
            resizeHandles={[]}
          >
            {selectedTab !== props.cards[device].length &&
              props.cards[device][selectedTab].map((val, idx) => {
                return (
                  <Item key={val.i}>
                    <b className="prevent-select"> {val.type} Card </b>
                    <div>
                      <IconButton
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) =>
                          handleCardDeleteMobile(e, device, selectedTab, idx)
                        }
                        onClick={() => {
                          props.handleCardDelete(device, selectedTab, idx);
                          setChangingCards(true);
                        }}
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
          <div ref={bottom} />
        </DialogContent>
      </Dialog>
      <EditDialogAdd
        openEditDialogAdd={openEditDialogAdd}
        handleCloseEditDialogAdd={handleCloseEditDialogAdd}
        handleCardAdd={handleCardAdd}
        rooms={props.rooms}
        selectedTab={selectedTab}
        device={device}
      />
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
          Must have at least one Dashboard!
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
          Dashboard added!
        </Alert>
      </Snackbar>
    </>
  );
}

import PropTypes from "prop-types";

// PropTypes for EditDialog component
EditDialog.propTypes = {
  openEditDialog: PropTypes.bool.isRequired,
  handleCloseEditDialog: PropTypes.func.isRequired,
  handleCardAdd: PropTypes.func.isRequired,
  handleCardDelete: PropTypes.func.isRequired,
  handleDeleteDashboard: PropTypes.func.isRequired,
  handleAddDashboard: PropTypes.func.isRequired,
  handleSetLayout: PropTypes.func.isRequired,
  cards: PropTypes.object.isRequired,
  rooms: PropTypes.array.isRequired,
};
