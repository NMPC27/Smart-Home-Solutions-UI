import AppBarStyled from "../components/AppBar/AppBarStyled";
import Grid from "@mui/material/Grid";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { DrawIoEmbed } from 'react-drawio';
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from "@mui/material/TextField";
import UploadIcon from '@mui/icons-material/Upload';
import { 
  getDevices, 
  deviceOn,
  deviceTemperatureTarget,
  deviceLightColor,
  deviceLightBrightness,
  deviceAlarm,
  getBuildTabs,
  buildTabAdd,
  buildTabEdit,
  buildTabRemove,
  getBuildHouseLayout,
  getBuildsHouseLayoutDevices,
  buildsHouseLayoutEdit,
  buildsHouseLayoutDevicesEdit,
} from "../components/API";
import ButtonGroup from '@mui/material/ButtonGroup';
import ReactFlow, {
  useNodesState
} from 'reactflow';
import Skeleton from "@mui/material/Skeleton";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDebounce } from "use-debounce";

import LightsDialog from "../components/Building/LightsDialog";
import CameraDialog from "../components/Building/CameraDialog";
import TemperatureDialog from "../components/Building/TemperatureDialog";
import MotionSensorDialog from "../components/Building/MotionSensorDialog";
import TemperatureSensorDialog from "../components/Building/TemperatureSensorDialog";
import HumiditySensorDialog from "../components/Building/HumiditySensorDialog";
import PowerSensorDialog from "../components/Building/PowerSensorDialog";

import CameraNode from "../components/Building/CameraNode";
import LightsNode from "../components/Building/LightsNode";
import TemperatureNode from "../components/Building/TemperatureNode";
import MotionSensorNode from "../components/Building/MotionSensorNode";
import TemperatureSensorNode from "../components/Building/TemperatureSensorNode";
import HumiditySensorNode from "../components/Building/HumiditySensorNode";
import PowerSensorNode from "../components/Building/PowerSensorNode";


import 'reactflow/dist/style.css';

const whiteImg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxcHgiIGhlaWdodD0iMXB4IiB2aWV3Qm94PSItMC41IC0wLjUgMSAxIiBjb250ZW50PSImbHQ7bXhmaWxlIGhvc3Q9JnF1b3Q7ZW1iZWQuZGlhZ3JhbXMubmV0JnF1b3Q7IG1vZGlmaWVkPSZxdW90OzIwMjQtMDUtMDhUMTM6Mjc6NTkuOTE4WiZxdW90OyBhZ2VudD0mcXVvdDtNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTI0LjAuMC4wIFNhZmFyaS81MzcuMzYmcXVvdDsgdmVyc2lvbj0mcXVvdDsyNC4zLjEmcXVvdDsgZXRhZz0mcXVvdDtld3JwUDZ3TXJkVXQtZkpXRVFsdyZxdW90OyB0eXBlPSZxdW90O2VtYmVkJnF1b3Q7Jmd0OyZsdDtkaWFncmFtIGlkPSZxdW90O0x4QVl3WFVTSGxfQlFvZTA4OXVfJnF1b3Q7IG5hbWU9JnF1b3Q7UMOhZ2luYS0xJnF1b3Q7Jmd0O2RkSE5Fb0lnRUFEZ3ArR3VVRmxuczdwMDh0Q1prVTJZUWRkQkdxMm5UMmMxWTZ3THMzeTdzUHd3a1ZiOTJjbEdYMUdCWlR4U1BSTkh4bmtTSjhNNHdwTmdJN1lFcFRPS0tGNGdOeStZTUpyMFlSUzBRYUZIdE40MElSWlkxMUQ0d0tSejJJVmxkN1JoMTBhV3NJSzhrSGF0TjZPOEp0M3paUEVMbUZMUG5lUGRnVEtWbkl1bm03UmFLdXkrU0dSTXBBN1JVMVQxS2RqeDdlWjNvWFduUDluUHdSelUvc2VDSVZqMkhpYkJCNG5zRFE9PSZsdDsvZGlhZ3JhbSZndDsmbHQ7L214ZmlsZSZndDsiPjxkZWZzLz48Zy8+PC9zdmc+"


const nodeTypes = {
  cameraNode: CameraNode,
  lightsNode: LightsNode,
  temperatureNode: TemperatureNode,
  motionSensorNode: MotionSensorNode,
  temperatureSensorNode: TemperatureSensorNode,
  humiditySensorNode: HumiditySensorNode,
  powerSensorNode: PowerSensorNode,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const OutItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#111827",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#FFFFFF",
  borderRadius: "20px",
}));

const InItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "20px",
}));


export default function Building() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  let navigate = useNavigate();

  React.useEffect(() => {
    if (mobile) {
      document.body.style.margin = "1vw";
    } else {
      document.body.style.margin = "5vw";
      document.body.style.marginTop = "3vh";
    }
  }, [mobile]);

  const [openErrorMsg, setOpenErrorMsg] = React.useState(false); 
  const [errorMsg, setErrorMsg] = React.useState("");
  const [openSuccessMsg, setOpenSuccessMsg] = React.useState(false); 
  const [successMsg, setSuccessMsg] = React.useState("");

  const [devices, setDevices] = React.useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const [nodesFinal] = useDebounce(nodes, 1000);
  const [tabChanged, setTabChanged] = React.useState(false);

  const [selectedTab, setSelectedTab] = React.useState(0);

  const [tabs, setTabs] = React.useState(null);
  const [editIdx, setEditIdx] = React.useState(-1);
  const [tabName, setTabName] = React.useState("");

  const [houseLayout, setHouseLayout] = React.useState(null); //! set null

  const [globalNodes, setGlobalNodes] = React.useState(null); //! set null

  const [mode, setMode] = React.useState("view");

  const [openDialogLights, setOpenDialogLights] = React.useState(false);
  const [openDialogCamera, setOpenDialogCamera] = React.useState(false);
  const [openDialogTemperature, setOpenDialogTemperature] = React.useState(false);
  const [openDialogMotionSensor, setOpenDialogMotionSensor] = React.useState(false);
  const [openDialogTemperatureSensor, setOpenDialogTemperatureSensor] = React.useState(false);
  const [openDialogHumiditySensor, setOpenDialogHumiditySensor] = React.useState(false);
  const [openDialogPowerSensor, setOpenDialogPowerSensor] = React.useState(false);
  const [deviceID, setDeviceID] = React.useState(-1);

  const openDialog = (deviceId, type) => {
    setDeviceID(deviceId)

    if (type === "Camera") {
      setOpenDialogCamera(true);
    }else if (type === "Lights") {
      setOpenDialogLights(true);
    }else if (type === "Temperature") {
      setOpenDialogTemperature(true);
    }else if (type === "Motion Sensor") {
      setOpenDialogMotionSensor(true);
    } else if (type === "Temperature Sensor") {
      setOpenDialogTemperatureSensor(true);
    } else if (type === "Humidity Sensor") {
      setOpenDialogHumiditySensor(true);
    } else if (type === "Power") {
      setOpenDialogPowerSensor(true);
    }
  }

  React.useEffect(() => {
    getDevices().then(
      (devices) => {
        setDevices(devices.data);

        let devicesIds = devices.data.map((device) => device.id);

        getBuildsHouseLayoutDevices().then((res) => {

            for(let tab=0; tab<res.data.length; tab++){
              for(let i = 0; i < res.data[tab].length; i++){
                if ( devicesIds.includes(res.data[tab][i].id) ) {
                  res.data[tab][i].data.name = devices.data.find((device) => device.id === res.data[tab][i].id).name
                  res.data[tab][i].data.openDialog = openDialog
                }else{
                  res.data[tab].splice(i, 1);
                  i--;
                }
              }
            }
    
            setGlobalNodes(res.data);
          }
        ).catch((error) => {
          if ("response" in error) {
            setErrorMsg(error.response.status+" "+error.response.statusText);
            setOpenErrorMsg(true);
            setGlobalNodes(null)
    
            return
          } 
    
          navigate("/");
        })

      }
    ).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.statusText);
        setOpenErrorMsg(true);
        setDevices(null)

        return
      } 

      navigate("/");
    })

    getBuildTabs().then(
      (res) => {
        setTabs(res.data);
      }
    ).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.statusText);
        setOpenErrorMsg(true);
        setTabs(null)

        return
      } 

      navigate("/");
    })

    getBuildHouseLayout().then(
      (res) => {
        setHouseLayout(res.data);
      }
    ).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.statusText);
        setOpenErrorMsg(true);
        setHouseLayout(null)

        return
      } 

      navigate("/");
    })

  }, []);

  const handleLightColor = (val, idx) => {
    let tmp = [...devices];
    tmp[idx].color = val;
    setDevices(tmp);

    deviceLightColor({ id: tmp[idx].id, color: val}).then((res) => { //! API CALL
      setSuccessMsg("Color changed successfully!")
      setOpenSuccessMsg(true)
    }).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.statusText);
        setOpenErrorMsg(true);
      }
    })
    
  };

  const handleBrightnessChange = (val, idx) => {
    let tmp = [...devices];
    tmp[idx].brightness = val;
    setDevices(tmp);

    deviceLightBrightness({ id: tmp[idx].id, brightness: val}).then((res) => { //! API CALL
      setSuccessMsg("Brightness changed successfully!")
      setOpenSuccessMsg(true)
    }).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.statusText);
        setOpenErrorMsg(true);
      }
    })
  };

  const handleLightOnOff = (idx) => {
    let tmp = [...devices];
    tmp[idx].on = !tmp[idx].on;
    setDevices(tmp);

    deviceOn({ id: tmp[idx].id, on: tmp[idx].on }).then((res) => { //! API CALL
      setSuccessMsg("Light turned "+(tmp[idx].on ? "on" : "off")+" successfully!")
      setOpenSuccessMsg(true)
    }).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.statusText);
        setOpenErrorMsg(true);
      }
    })
  };

  const handleCameraOnOff = (idx) => {
    let tmp = [...devices];
    tmp[idx].on = !tmp[idx].on;
    setDevices(tmp);

    deviceOn({ id: tmp[idx].id, on: tmp[idx].on }).then((res) => { //! API CALL
      setSuccessMsg("Camera turned "+(tmp[idx].on ? "on" : "off")+" successfully!")
      setOpenSuccessMsg(true)
    }).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.statusText);
        setOpenErrorMsg(true);
      }
    })
  };

  const handleTemperatureTarget = (val, idx) => {
    const newTemp = parseInt(val);

    let tmp = [...devices];
    tmp[idx].targetTemperature = newTemp;
    setDevices(tmp);

    deviceTemperatureTarget({ id: tmp[idx].id, targetTemperature: newTemp }).then((res) => { //! API CALL
      setSuccessMsg("Temperature target changed successfully!")
      setOpenSuccessMsg(true)
    }).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.statusText);
        setOpenErrorMsg(true);
      }
    })
  };

  const handleMinusTemperature = (idx) => {
    let tmp = [...devices];
    let newTemp = tmp[idx].targetTemperature -1;
    tmp[idx].targetTemperature = newTemp
    setDevices(tmp);

    deviceTemperatureTarget({ id: tmp[idx].id, targetTemperature: newTemp }).then((res) => { //! API CALL
      setSuccessMsg("Temperature target changed successfully!")
      setOpenSuccessMsg(true)
    }).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.statusText);
        setOpenErrorMsg(true);
      }
    })
  };

  const handlePlusTemperature = (idx) => {
    let tmp = [...devices];
    let newTemp = tmp[idx].targetTemperature + 1;
    tmp[idx].targetTemperature = newTemp
    setDevices(tmp);

    deviceTemperatureTarget({ id: tmp[idx].id, targetTemperature: newTemp }).then((res) => { //! API CALL
      setSuccessMsg("Temperature target changed successfully!")
      setOpenSuccessMsg(true)
    }).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.statusText);
        setOpenErrorMsg(true);
      }
    })
  };

  const handleTemperatureOnOff = (idx) => {
    let tmp = [...devices];
    tmp[idx].on = !tmp[idx].on;
    setDevices(tmp);

    deviceOn({ id: tmp[idx].id, on: tmp[idx].on }).then((res) => { //! API CALL
      setSuccessMsg("Temperature turned "+(tmp[idx].on ? "on" : "off")+" successfully!")
      setOpenSuccessMsg(true)
    }).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.statusText);
        setOpenErrorMsg(true);
      }
    })
  };

  const handleAddTab = () => {
    setTabChanged(true)
    buildsHouseLayoutDevicesEdit({idx: selectedTab, devices: nodes}) //! API CALL

    let tmp = [...tabs];
    let name = "Floor "+tmp.length;
    tmp.push(name);

    setHouseLayout([...houseLayout, whiteImg])

    setGlobalNodes([...globalNodes, []]);
    setNodes([])

    setTabs(tmp);
    setMode('view')

    buildTabAdd({name: name}).then((res) => { //! API CALL
      setSuccessMsg("Floor added successfully!")
      setOpenSuccessMsg(true)
    }).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.statusText);
        setOpenErrorMsg(true);
      }
    })
  }

  const handleDeleteTab = (idx) => {

    if (tabs.length === 1) { 
      setErrorMsg("Must have at least one Floor!")
      setOpenErrorMsg(true); 
      return 
    }

    let tmp = [...tabs];
    tmp.splice(idx, 1);
    setTabs(tmp);

    let tab = idx - 1
    if (tab < 0) { tab = 0; }
    setSelectedTab(tab)

    let tmpHouse = [...houseLayout];
    tmpHouse.splice(idx, 1);
    setHouseLayout(tmpHouse);

    let tmpNodes = [...globalNodes];
    tmpNodes.splice(idx, 1);
    setGlobalNodes(tmpNodes);

    buildTabRemove({idx: idx}).then((res) => { //! API CALL
      setSuccessMsg("Floor removed successfully!")
      setOpenSuccessMsg(true)
    }).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.statusText);
        setOpenErrorMsg(true);
      }
    })
  }

  
  const handleChangeTab = (newValue) => {
    setTabChanged(true)
    buildsHouseLayoutDevicesEdit({idx: selectedTab, devices: nodes}); //! API CALL

    if (tabs.length === newValue) { return; }

    setSelectedTab(newValue);

    setNodes(globalNodes[newValue]);
  }

  const handleKeyDown = (event,idx) => {
    if (event.key === "Enter") {
      handleChangeTabName(idx);
    }
  };

  const handleChangeTabName = (idx) => {
    setEditIdx(-1)

    let tmp = [...tabs];
    tmp[idx] = tabName;
    setTabs(tmp);

    buildTabEdit({idx: idx, name: tabName}).then((res) => { //! API CALL
      setSuccessMsg("Floor name changed successfully!")
      setOpenSuccessMsg(true)
    }).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.statusText);
        setOpenErrorMsg(true);
      }
    })
  }

  const handleClickAlarm = (val,idx) => {
    let tmp = [...devices];

    tmp[idx].on = val;

    setDevices(tmp);

    deviceAlarm({on: val}).then((res) => { //! API CALL
      setSuccessMsg("Alarm turned "+(val ? "on" : "off")+" successfully!")
      setOpenSuccessMsg(true)
    }).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.statusText);
        setOpenErrorMsg(true);
      }
    })
  };

  const [loaded, setLoaded] = React.useState(false); 
  React.useEffect(() => {  //! para carregar os nodes globais e fazer set deles pq no 1 load n faz

    if (globalNodes !== null && !loaded) {

      setNodes(globalNodes[selectedTab])

      setLoaded(true);

    }

  },[globalNodes])

  React.useEffect(() => {
    if (tabs === null) { return; }
    if (tabs.length === 0) { return; }
    if (globalNodes === null) { return; }

    let tmpNodes = [...globalNodes];

    tmpNodes[selectedTab] = nodes;

    setGlobalNodes(tmpNodes);

  },[nodes])

  React.useEffect(() => {
    if (loaded){
      if (tabChanged){
        setTabChanged(false);
      }else{
        buildsHouseLayoutDevicesEdit({idx: selectedTab, devices: nodesFinal}); //! API CALL
      }
    }
  },[nodesFinal])

  React.useEffect(() => { //! para mudar as cores dos icons

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === deviceID) {

          let deviceIdx = devices.findIndex((device) => device.id === deviceID);

          node.data = {
            ...node.data,
            on: devices[deviceIdx].on,
          };
        }

        return node;
      })
    );

  },[devices])

  const handleSave = (data) => {
    let tmp = [...houseLayout];
    tmp[selectedTab] = data.data;
    setHouseLayout(tmp);

    buildsHouseLayoutEdit({idx: selectedTab, img: data.data}).then((res) => { //! API CALL
      setSuccessMsg("House layout changed successfully!")
      setOpenSuccessMsg(true)
    }).catch((error) => {
      if ("response" in error) {
        setErrorMsg(error.response.status+" "+error.response.statusText);
        setOpenErrorMsg(true);
      }
    })
  }

  const uploadImg = (e) => {
    let reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = function () {
      let tmp = [...houseLayout];
      tmp[selectedTab] = reader.result;
      setHouseLayout(tmp);

      buildsHouseLayoutEdit({idx: selectedTab, img: reader.result}).then((res) => { //! API CALL
        setSuccessMsg("House layout changed successfully!")
        setOpenSuccessMsg(true)
      }).catch((error) => {
        if ("response" in error) {
          setErrorMsg(error.response.status+" "+error.response.statusText);
          setOpenErrorMsg(true);
        }
      })
    }

  }

  const [posX, setPosX] = React.useState(-100);
  const [posY, setPosY] = React.useState(-50);

  const randomXY = () => {
    let tmpX = posX
    let tmpY = posY

    if (posX === 50) {
      tmpX = -50
      tmpY += 50
    }else {
      tmpX += 50
    }

    if (tmpY === 100) {
      tmpY = -50
    }

    setPosX(tmpX)
    setPosY(tmpY)

    return { x: tmpX, y: tmpY }
  }

  if (devices === null || tabs === null || houseLayout === null || globalNodes === null) {
    return (
      <>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Skeleton
              variant="rounded"
              height="7vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Skeleton
              variant="rounded"
              height="60vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Skeleton
              variant="rounded"
              height="60vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
        </Grid>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openErrorMsg}
          autoHideDuration={6000}
          onClose={(event, reason) => {
            if (reason !== "clickaway") {
              setOpenErrorMsg(false);
            }
          }}
        >
          <Alert
            severity="error"
            sx={{ width: "100%" }}
            onClose={(event, reason) => {
              if (reason !== "clickaway") {
                setOpenErrorMsg(false);
              }
            }}
          >
            {errorMsg}
          </Alert>
        </Snackbar>
      </>
    );
  }

  return (
    <>
      <AppBarStyled navbar={"building"} />

      <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={3}>
            <OutItem elevation={5}>
              <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>
              Devices
              </h2>
              <InItem style={{ minHeight: "70vh", maxHeight: "70vh", overflowY: "auto" }} >
                <Grid container spacing={4}>
                  { devices && devices.map((device, idx) => {
                    if (device.type === "Energy") {return}

                    return (
                      <Grid item xs={12} sm={12} md={6}>
                        <Button 
                          fullWidth 
                          variant="contained"
                          onClick={() => {
                            let tmpType = null

                            if (device.type === "Camera") {
                              tmpType = "cameraNode"
                            } else if (device.type === "Light") {
                              tmpType = "lightsNode"
                            } else if (device.type === "Temperature") {
                              tmpType = "temperatureNode"
                            } else if (device.type === "Motion Sensor") {
                              tmpType = "motionSensorNode"
                            } else if (device.type === "Temperature Sensor") {
                              tmpType = "temperatureSensorNode"
                            } else if (device.type === "Humidity Sensor") {
                              tmpType = "humiditySensorNode"
                            } else if (device.type === "Power") {
                              tmpType = "powerSensorNode"
                            }

                            setNodes(
                              [
                                ...nodes,
                                { 
                                  id: device.id,   
                                  type: tmpType,                           
                                  position: randomXY(), 
                                  data: { openDialog: openDialog, name: device.name, on: device.on },
                                }
                              ]
                            );
                          }}
                          >
                            <b>{device.name}</b>
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </InItem>
            </OutItem>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={9}>
            <OutItem elevation={5}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={6} md={8}>
                  <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>
                    Build
                  </h2>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>    
                  <IconButton
                    sx={{ color: "#FFFFFF", marginRight: "0.5vw" }}
                    component="label"
                  >
                      <UploadIcon fontSize="large"/>
                      <input 
                        accept="image/*" 
                        type="file" 
                        hidden
                        onChange={(e) => uploadImg(e)}
                      />
                  </IconButton>
                  <ButtonGroup sx={{marginTop:'0.5vh', marginBottom: '0.5vh'}}>
                    <Button onClick={() => setMode('draw')} variant={mode === 'draw' ? "contained" : "outlined"}>
                      <b>DRAW</b>
                    </Button>
                    <Button onClick={() => setMode('edit')} variant={mode === 'edit' ? "contained" : "outlined"}>
                      <b>EDIT</b>
                    </Button>
                    <Button onClick={() => setMode('view')} variant={mode === 'view' ? "contained" : "outlined"}>
                      <b>VIEW</b>
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
              <InItem>
              <Tabs 
                  value={selectedTab} 
                  onChange={(event, newValue) => handleChangeTab(newValue)}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {tabs.map((val, idx) => {
                    return <Tab
                      label={ 
                      editIdx === idx ?         
                        <span>
                          <IconButton
                            sx={{marginRight: "1vw"}}
                            onClick={() => setEditIdx(-1)}
                          >
                            <ClearIcon />
                          </IconButton>
                          <TextField
                              label="Flow Name"
                              variant="outlined"
                              size="small"
                              sx={{width: '50%'}}
                              onChange={(e) => setTabName(e.target.value)}
                              onKeyDown={(e) => handleKeyDown(e,idx)}
                            />
                          <IconButton
                            onClick={() => handleChangeTabName(idx)}
                            sx={{marginLeft: "1vw"}}
                          >
                            <CheckIcon />
                          </IconButton>   
                        </span>
                      :
                      <span>
                        <IconButton sx={{marginRight: "1vw"}} size="small" onClick={() => setEditIdx(idx)}>
                          <EditIcon />
                        </IconButton>
                        {val}
                        <IconButton sx={{marginLeft: "1vw"}} size="small" onClick={() => handleDeleteTab(idx)}>
                          <DeleteIcon />
                        </IconButton>
                      </span>
                      } 
                      value={idx} 
                      style={{fontWeight:"bold"}}/>
                  })
                  }
                  <Tab 
                    label={"+ Add"} 
                    value={tabs.length} 
                    style={{fontWeight:"bold"}}
                    onClick={() => handleAddTab()}
                  />
                
                </Tabs>
                <div style={{ width: '100%', height: '63vh', marginTop: '1vh' }} >
                  { mode === 'draw' &&
                    <DrawIoEmbed 
                      xml={houseLayout[selectedTab]}
                      onExport={(data) =>  handleSave(data)}
                      onClose={() => setMode('view')} 
                    />
                  }

                  { (mode === 'edit' || mode === 'view' ) && 
                      <ReactFlow
                        nodes={nodes}
                        onNodesChange={onNodesChange}
                        nodesDraggable={mode === 'edit' ? true : false}
                        zoomOnScroll={false}
                        panOnDrag={false}
                        elementsSelectable={true}
                        zoomOnDoubleClick={false}
                        nodeTypes={nodeTypes}
                        translateExtent={[[0,0],[100,100]]}
                      >
                        <img src={houseLayout[selectedTab]} width='100%' height='100%'/>
                      </ReactFlow> 
                  }        
                </div>
                
              </InItem>
            </OutItem>
          </Grid>
      </Grid>
      {devices !== null && 
        <>
          <LightsDialog
            openDialog={openDialogLights}
            deviceID={deviceID}
            devices={devices}
            handleCloseDialog={() => setOpenDialogLights(false)}
            handleLightColor={handleLightColor}
            handleBrightnessChange={handleBrightnessChange}
            handleLightOnOff={handleLightOnOff}
          />
          <CameraDialog
            openDialog={openDialogCamera}
            deviceID={deviceID}
            devices={devices}
            handleCloseDialog={() => setOpenDialogCamera(false)}
            handleCameraOnOff={handleCameraOnOff}
          />
          <TemperatureDialog 
            openDialog={openDialogTemperature}
            deviceID={deviceID}
            devices={devices}
            handleCloseDialog={() => setOpenDialogTemperature(false)}
            handleTemperatureTarget={handleTemperatureTarget}
            handlePlusTemperature={handlePlusTemperature}
            handleMinusTemperature={handleMinusTemperature}
            handleTemperatureOnOff={handleTemperatureOnOff}
          />
          <MotionSensorDialog
            openDialog={openDialogMotionSensor}
            deviceID={deviceID}
            devices={devices}
            handleCloseDialog={() => setOpenDialogMotionSensor(false)}
            handleClickAlarm={handleClickAlarm}
          />
          <TemperatureSensorDialog
            openDialog={openDialogTemperatureSensor}
            deviceID={deviceID}
            devices={devices}
            handleCloseDialog={() => setOpenDialogTemperatureSensor(false)}
          />
          <HumiditySensorDialog
            openDialog={openDialogHumiditySensor}
            deviceID={deviceID}
            devices={devices}
            handleCloseDialog={() => setOpenDialogHumiditySensor(false)}
          />
          <PowerSensorDialog
            openDialog={openDialogPowerSensor}
            deviceID={deviceID}
            devices={devices}
            handleCloseDialog={() => setOpenDialogPowerSensor(false)}
          />
        </>
      }
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openErrorMsg}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason !== "clickaway") {
            setOpenErrorMsg(false);
          }
        }}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={(event, reason) => {
            if (reason !== "clickaway") {
              setOpenErrorMsg(false);
            }
          }}
        >
          {errorMsg}
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
          {successMsg}
        </Alert>
      </Snackbar>
    </>    
  );
}
