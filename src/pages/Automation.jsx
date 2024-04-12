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
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import {
  getDevices,
  getFlowTabs,
  flowTabAdd,
  flowTabEdit,
  flowTabRemove,
  flowEdit,
  getFlowNodes,
  getFlowEdges,
  nodesDataEdit,
  nodesDataAdd,
  getNodesData,
  nodesDataRemove,
  applyFlow
} from "../components/API";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDebounce } from "use-debounce";

import DeviceSelectorNode from '../components/Automation/DeviceNode';
import TimeNode from '../components/Automation/TimeNode';
import WaitNode from "../components/Automation/WaitNode";
import EventNode from "../components/Automation/EventNode";
import CustomEdge from "../components/Automation/CustomEdge";

const nodeTypes = {
  deviceNode: DeviceSelectorNode,
  timeNode: TimeNode,
  waitNode: WaitNode,
  eventNode: EventNode,
};

const edgeTypes = {
  customedge: CustomEdge,
};

const OutItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1F2937",
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Automation() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  const [openErrorMsg1, setOpenErrorMsg1] = React.useState(false); // must have at least one flow

  let navigate = useNavigate();

  React.useEffect(() => {
    if (mobile) {
      document.body.style.margin = "1vw";
    }
  }, [mobile]);

  const [devices, setDevices] = React.useState(null);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [tabs, setTabs] = React.useState(null);
  const [editIdx, setEditIdx] = React.useState(-1);
  const [tabName, setTabName] = React.useState("");

  const [globalNodes, setGlobalNodes] = React.useState(null); //! iniciate at null
  const [globalEdges, setGlobalEdges] = React.useState(null); //! iniciate at null
  const [nodesData, setNodesData] = React.useState(null)

  const clearNodeData = (id) => {
    let tmpNodesData = [...nodesData]
    let idx = nodesData[selectedTab].findIndex(node => node.id === id)
    tmpNodesData[selectedTab].splice(idx, 1)
    setNodesData(tmpNodesData)

    nodesDataRemove({tab: selectedTab, idx: idx}) //! API call
  }


  const eventData = (val) => {
    let idx = nodesData[selectedTab].findIndex(node => node.id === val.id)
    let tmp = [...nodesData]
    let keys = Object.keys(val)
    keys.forEach((key) => {
      if (key === "id") { return }
      
      tmp[selectedTab][idx][key] = val[key]
      setNodesData(tmp)
    })
    nodesDataEdit({ tab: selectedTab, idx: idx, nodeData: tmp[selectedTab][idx] }) //! API call
  }

  const deviceData = (val) => {

    if (nodesData === null) { return } //! chack this

    let idx = nodesData[selectedTab].findIndex(node => node.id === val.id)
    let tmp = [...nodesData]
    let keys = Object.keys(val)
    keys.forEach((key) => {
      if (key === "id") { return }
      
      tmp[selectedTab][idx][key] = val[key]
      setNodesData(tmp)
    })
    nodesDataEdit({ tab: selectedTab, idx: idx, nodeData: tmp[selectedTab][idx] }) //! API call
  }

  const timeData = (val) => {
    let idx = nodesData[selectedTab].findIndex(node => node.id === val.id)

    let tmp = [...nodesData]
    tmp[selectedTab][idx].time = val.time
    setNodesData(tmp)
    nodesDataEdit({ tab: selectedTab, idx: idx, nodeData: tmp[selectedTab][idx] }) //! API call
  }

  const waitData = (val) => {
    let idx = nodesData[selectedTab].findIndex(node => node.id === val.id)

    let tmp = [...nodesData]
    tmp[selectedTab][idx].wait = val.wait
    setNodesData(tmp)
    nodesDataEdit({ tab: selectedTab, idx: idx, nodeData: tmp[selectedTab][idx] }) //! API call
  }

  React.useEffect(() => {
    getDevices().then(
      (res) => {
        setDevices(res.data);
      },
      () => {
        navigate("/");
      },
    );

    getFlowTabs().then(
      (res) => {
        setTabs(res.data);
      },
      () => {
        navigate("/");
      },
    );
    
    getFlowNodes().then(
      (flowNodes) => {

        getNodesData().then(
          (nodesData) => {

            for(let tab=0; tab<flowNodes.data.length; tab++){
              for(let i = 0; i < flowNodes.data[tab].length; i++){
                if (flowNodes.data[tab][i].id === nodesData.data[tab][i].id){
                  if (flowNodes.data[tab][i].type === "eventNode"){
                    flowNodes.data[tab][i].data.editData = eventData
                    flowNodes.data[tab][i].data.deviceID = nodesData.data[tab][i].deviceID
                    flowNodes.data[tab][i].data.temperature = nodesData.data[tab][i].temperature
                    flowNodes.data[tab][i].data.humidity = nodesData.data[tab][i].humidity
                    flowNodes.data[tab][i].data.sinal = nodesData.data[tab][i].sinal
                    flowNodes.data[tab][i].data.sensor = nodesData.data[tab][i].sensor
                  }
                  if (flowNodes.data[tab][i].type === "deviceNode"){
                    flowNodes.data[tab][i].data.editData = deviceData
                    flowNodes.data[tab][i].data.deviceID = nodesData.data[tab][i].deviceID
                    flowNodes.data[tab][i].data.deviceState = nodesData.data[tab][i].deviceState
                    flowNodes.data[tab][i].data.temperature = nodesData.data[tab][i].temperature
                    flowNodes.data[tab][i].data.color = nodesData.data[tab][i].color
                    flowNodes.data[tab][i].data.brightness = nodesData.data[tab][i].brightness
                  }
                  if (flowNodes.data[tab][i].type === "timeNode"){
                    flowNodes.data[tab][i].data.editData = timeData
                    flowNodes.data[tab][i].data.time = nodesData.data[tab][i].time
                  }
                  if (flowNodes.data[tab][i].type === "waitNode"){
                    flowNodes.data[tab][i].data.editData = waitData
                    flowNodes.data[tab][i].data.wait = nodesData.data[tab][i].wait
                  }

                  flowNodes.data[tab][i].data.clearNodeData = clearNodeData
                
                } else {
                  console.log("ERROR: ID MISMATCH")
                }
              }
            }
            setGlobalNodes(flowNodes.data);

            setNodesData(nodesData.data)
          },
          () => {
            navigate("/");
          }
        )
      },
      () => {
        navigate("/");
      },
    );

    getFlowEdges().then(
      (res) => {
        setGlobalEdges(res.data);
      },
      () => {
        navigate("/");
      },
    );

  }, []);



  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [nodesFinal] = useDebounce(nodes, 1000);
  const [edgesFinal] = useDebounce(edges, 1000);
  const [tabChanged, setTabChanged] = React.useState(false);

  const [newID, setNewID] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false); 
  React.useEffect(() => {  //! para carregar os nodes e edges globais e fazer set deles pq no 1 load n faz

    if (globalNodes !== null && globalEdges !== null && !loaded) {

      setNodes(globalNodes[selectedTab])
      setEdges(globalEdges[selectedTab])

      setLoaded(true);

      let max = 0;
      for (let i=0;i<globalNodes.length;i++){
        if (globalNodes[i].length !== 0) { 
          globalNodes[i].forEach((node) => {
            if (parseInt(node.id) > max) {
              max = parseInt(node.id);
            }
          });
        }
      }

      setNewID(max+1)

    }

  },[globalNodes, globalEdges])


  React.useEffect(() => {

    if (tabs === null) { return; }
    if (tabs.length === 0) { return; }

    let tmpNodes = [...globalNodes];
    let tmpEdges = [...globalEdges];

    tmpNodes[selectedTab] = nodes;
    tmpEdges[selectedTab] = edges;

    setGlobalNodes(tmpNodes);
    setGlobalEdges(tmpEdges);

  },[nodes, edges])

  React.useEffect(() => {
    if (loaded){
      if (tabChanged){
        setTabChanged(false);
      }else{
        flowEdit({nodes: nodesFinal, edges: edgesFinal, idx: selectedTab}) //! API call
      }
    }
  },[nodesFinal, edgesFinal])

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

    flowTabEdit({name: tabName, idx: idx}) //! API call
  }

  const handleAddTab = () => {
    setTabChanged(true)
    flowEdit({nodes: nodes, edges: edges, idx: selectedTab}) //! API call -> save the currentab nodes

    let tmp = [...tabs];
    let len = tmp.length;
    tmp.push("Flow "+len);

    setGlobalNodes([...globalNodes, []]);
    setGlobalEdges([...globalEdges, []]);
    setNodesData([...nodesData, []])

    setNodes([])
    setEdges([])

    setTabs(tmp);

    flowTabAdd({name: "Flow "+len}) //! API call
  }

  const handleDeleteTab = (idx) => {

    if (tabs.length === 1) { setOpenErrorMsg1(true); return }

    let tmp = [...tabs];
    tmp.splice(idx, 1);
    setTabs(tmp);

    let tmpNodes = [...globalNodes];
    let tmpEdges = [...globalEdges];
    let tmpNodesData = [...nodesData]

    tmpNodes.splice(idx, 1);
    tmpEdges.splice(idx, 1);
    tmpNodesData.splice(idx, 1)

    setGlobalNodes(tmpNodes);
    setGlobalEdges(tmpEdges);
    setNodesData(tmpNodesData)

    flowTabRemove({idx: idx}) //! API call
  }

  const handleChangeTab = (newValue) => {
    setTabChanged(true)
    flowEdit({nodes: nodes, edges: edges, idx: selectedTab}) //! API call
    setSelectedTab(newValue);

    if (tabs.length === newValue) { return; }

    setNodes(globalNodes[newValue])
    setEdges(globalEdges[newValue])

  }

  const onConnect = React.useCallback(
    (params) => setEdges((eds) => addEdge(
      {
        ...params, 
        type: 'customedge',
        markerEnd: { type: MarkerType.ArrowClosed }, 
        style: { strokeWidth: 2 },
      }, eds)),
    [setEdges],
  );


  React.useEffect(() => { //! DELETE
    console.log(nodesData)
  },[nodesData])


  const verifyFlow = () => {
    //! verificar se o flow esta bem feito
    //! se nao dar erro
    //! se sim, aplicar o flow

    if (nodes.length === 0) { 
      console.log("ERROR: no nodes") 
      return
    }


    let conectionNodes = new Set([])

    for (let i=0;i<edges.length;i++){
      conectionNodes.add(edges[i].source)
      conectionNodes.add(edges[i].target)
    }

    if (conectionNodes.size !== nodes.length) {
      console.log("ERROR: not all nodes are connected")
      return
    }

    let error = false;
    for (let i=0;i<nodes.length;i++){
      if (!conectionNodes.has(nodes[i].id)){
        error = true;
        console.log("ERROR: not all nodes are connected")
        return
      }
    }

    //! verificar se ha 2 flows so pode haver 1 flow

    applyFlow({nodesData: nodesData[selectedTab], edges: edges})
    
  }



  if (devices === null || tabs === null || globalNodes === null || globalEdges === null) { 
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
    </>
    );
  }


  return (
    <>
      <AppBarStyled navbar={"automation"} />

      <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={3}>
            <OutItem elevation={5}>
              <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>
                Nodes
              </h2>              
              <InItem style={{ height:'70vh' }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      onClick={() => {
                      let deviceId = null
                      
                      for (let i=0;i<devices.length;i++){
                        if (devices[i].type === "Temperature Sensor" || devices[i].type === "Motion Sensor" || devices[i].type === "Humidity Sensor"){
                          deviceId = devices[i].id;
                          break;
                        }
                      }

                      let tmp = [...nodesData]
                      tmp[selectedTab].push(
                        {
                          id: ''+newID,   
                          type: 'eventNode',
                          deviceID: deviceId,
                          temperature: 20,
                          humidity: 50,
                          sinal: "<",
                          sensor: "notDetected",
                          deviceType: null
                        }
                      )

                      setNodesData(tmp)
                      nodesDataAdd({ tab: selectedTab, nodeData: tmp[selectedTab][tmp[selectedTab].length-1] }) //! API call

                      setNodes(
                        [
                          ...nodes,
                          { 
                            id: ''+newID,   
                            type: 'eventNode',                            
                            position: { x: 20, y: 20 }, 
                            data: { 
                              devices: devices, 
                              editData: eventData,
                              clearNodeData: clearNodeData,
                              deviceID: deviceId,
                              temperature: 20,
                              humidity: 50,
                              sinal: "=",
                              sensor: "notDetected"
                            },
                            targetPosition: 'left',
                            sourcePosition: 'right',
                          }
                        ]
                      );
                      setNewID(newID + 1);
                    }}
                      >
                        <b>Event</b>
                      </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      onClick={() => {

                        let tmp = [...nodesData]
                        tmp[selectedTab].push(
                          {
                            id: ''+newID,   
                            type: 'waitNode',
                            wait: "00:00:00",
                          }
                        )
  
                        setNodesData(tmp)
                        nodesDataAdd({ tab: selectedTab, nodeData: tmp[selectedTab][tmp[selectedTab].length-1] }) //! API call
                      
                        setNodes(
                        [
                          ...nodes,
                          { 
                            id: ''+newID,   
                            type: 'waitNode',                          
                            position: { x: 20, y: 20 }, 
                            data: {
                              editData: waitData,
                              clearNodeData: clearNodeData,
                              wait: "00:00:00"
                            },
                            targetPosition: 'left',
                            sourcePosition: 'right',
                          }
                        ]
                      );
                      setNewID(newID + 1);
                    }}
                      >
                        <b>Wait</b>
                      </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      onClick={() => {
                        let deviceId = null
                      
                        for (let i=0;i<devices.length;i++){
                          if (devices[i].type === "Temperature" || devices[i].type === "Light"){
                            deviceId = devices[i].id;
                            break;
                          }
                        }
  
                        let tmp = [...nodesData]
                        tmp[selectedTab].push(
                          {
                            id: ''+newID,   
                            type: 'deviceNode',
                            deviceID: deviceId,
                            deviceState: "turnOff",
                            temperature: 20,
                            color: "#FFFFFF",
                            brightness: 100,
                            deviceType: null
                          }
                        )
  
                        setNodesData(tmp)
                        nodesDataAdd({ tab: selectedTab, nodeData: tmp[selectedTab][tmp[selectedTab].length-1] }) //! API call
                        
                        setNodes(
                          [
                            ...nodes,
                            { 
                              id: ''+newID, 
                              type: 'deviceNode',
                              position: { x: 20, y: 20 }, 
                              data: { 
                                devices: devices,
                                editData: deviceData,
                                clearNodeData: clearNodeData,
                                deviceID: deviceId,
                                deviceState: "turnOff",
                                temperature: 20,
                                color: "#FFFFFF",
                                brightness: 100,
                              },
                              targetPosition: 'left',
                              sourcePosition: 'right',
                            }
                          ]
                        );                      
                        setNewID(newID + 1);
                      }}
                      >
                        <b>Device</b>
                      </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      onClick={() => {
                        let tmp = [...nodesData]
                        tmp[selectedTab].push(
                          {
                            id: ''+newID,   
                            type: 'timeNode',
                            time: "00:00"
                          }
                        )
  
                        setNodesData(tmp)
                        nodesDataAdd({ tab: selectedTab, nodeData: tmp[selectedTab][tmp[selectedTab].length-1] }) //! API call
                      
                        setNodes(
                          [
                            ...nodes,
                            { 
                              id: ''+newID, 
                              type: 'timeNode',
                              position: { x: 20, y: 20 }, 
                              data: {
                                editData: timeData,
                                clearNodeData: clearNodeData,
                                time: "00:00"
                              },
                              targetPosition: 'left',
                              sourcePosition: 'right',
                            }
                          ]
                        );
                        setNewID(newID + 1);
                      }}
                      >
                        <b>Time</b>
                      </Button>
                  </Grid>
                </Grid>
              </InItem>
            </OutItem>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <OutItem elevation={5}>
              <Grid container spacing={0}>
                <Grid item xs={6} sm={9} md={10}>
                  <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>
                    Automation
                  </h2>
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                  <Button sx={{marginTop:'0.5vh'}} onClick={() => verifyFlow()} variant="contained">
                    <b>APPLY FLOW</b>
                  </Button>
                </Grid>
              </Grid>
              <InItem style={{ height:'70vh' }}>
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
                <div style={{ width: '100%', height: '63vh', marginTop: '1vh' }}>
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    fitView
                  >
                    <Background variant="dots" gap={12} size={1} />
                  </ReactFlow>
                </div>
              </InItem>
            </OutItem>
          </Grid>
      </Grid>
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
          Must have at least one flow!
        </Alert>
      </Snackbar>
    </>    
  );
}
