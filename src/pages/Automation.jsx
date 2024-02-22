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
import {
  getDevices,
  getRooms,
} from "../components/API";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from "@mui/material/TextField";

import DeviceSelectorNode from '../components/Automation/DeviceNode';
import TimeNode from '../components/Automation/TimeNode';
import WaitNode from "../components/Automation/WaitNode";
import EventNode from "../components/Automation/EventNode";

const nodeTypes = {
  deviceNode: DeviceSelectorNode,
  timeNode: TimeNode,
  waitNode: WaitNode,
  eventNode: EventNode,
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

export default function Automation() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  let navigate = useNavigate();

  React.useEffect(() => {
    if (mobile) {
      document.body.style.margin = "1vw";
    }
  }, [mobile]);

  const [devices, setDevices] = React.useState([]);

  React.useEffect(() => {
    getDevices().then(
      (res) => {
        setDevices(res.data);
      },
      () => {
        navigate("/");
      },
    );
  }, []);

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [tabs, setTabs] = React.useState(["Flow 0"]);
  const [editIdx, setEditIdx] = React.useState(-1);
  const [tabName, setTabName] = React.useState("");

  const [globalNodes, setGlobalNodes] = React.useState([]);
  const [globalEdges, setGlobalEdges] = React.useState([]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  React.useEffect(() => {

    if (tabs.length === 0) { return; }

    let tmpNodes = [...globalNodes];
    let tmpEdges = [...globalEdges];

    tmpNodes[selectedTab] = nodes;
    tmpEdges[selectedTab] = edges;

    setGlobalNodes(tmpNodes);
    setGlobalEdges(tmpEdges);
  },[nodes, edges])

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
  }

  const handleAddTab = () => {

    let tmp = [...tabs];
    tmp.push("Flow "+tmp.length);

    setGlobalNodes([...globalNodes, []]);
    setGlobalEdges([...globalEdges, []]);

    setTabs(tmp);
  }

  const handleDeleteTab = (idx) => {

    if (tabs.length === 1) { return; } //! throw error must have at leat one tab

    let tmp = [...tabs];
    tmp.splice(idx, 1);
    setTabs(tmp);

    let tmpNodes = [...globalNodes];
    let tmpEdges = [...globalEdges];

    tmpNodes.splice(idx, 1);
    tmpEdges.splice(idx, 1);

    setGlobalNodes(tmpNodes);
    setGlobalEdges(tmpEdges);

  }

  const handleChangeTab = (newValue) => {
    setSelectedTab(newValue);

    if (tabs.length === newValue) { return; }

    setNodes(globalNodes[newValue])
    setEdges(globalEdges[newValue])

  }

  const onConnect = React.useCallback(
    (params) => setEdges((eds) => addEdge(
      {
        ...params, 
        markerEnd: { type: MarkerType.ArrowClosed }, 
        style: { strokeWidth: 2 },
      }, eds)),
    [setEdges],
  );

  const verifyFlow = () => {
    //! verificar se o flow esta bem feito
    //! se nao dar erro
    //! se sim, aplicar o flow
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
                      onClick={() => setNodes(
                        [
                          ...nodes,
                          { 
                            id: ''+nodes.length,   
                            type: 'eventNode',                            
                            position: { x: 20, y: 20 }, 
                            data: { devices: devices},
                            targetPosition: 'left',
                            sourcePosition: 'right',
                          }
                        ]
                      )}
                      >
                        <b>Event</b>
                      </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      onClick={() => setNodes(
                        [
                          ...nodes,
                          { 
                            id: ''+nodes.length,   
                            type: 'waitNode',                          
                            position: { x: 20, y: 20 }, 
                            targetPosition: 'left',
                            sourcePosition: 'right',
                          }
                        ]
                      )}
                      >
                        <b>Wait</b>
                      </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      onClick={() => setNodes(
                        [
                          ...nodes,
                          { 
                            id: ''+nodes.length, 
                            type: 'deviceNode',
                            position: { x: 20, y: 20 }, 
                            data: { devices: devices},
                            targetPosition: 'left',
                            sourcePosition: 'right',
                          }
                        ]
                      )}
                      >
                        <b>Device</b>
                      </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      onClick={() => setNodes(
                        [
                          ...nodes,
                          { 
                            id: ''+nodes.length, 
                            type: 'timeNode',
                            position: { x: 20, y: 20 }, 
                            targetPosition: 'left',
                            sourcePosition: 'right',
                          }
                        ]
                      )}
                      >
                        <b>Time</b>
                      </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      onClick={() => setNodes(
                        [
                          ...nodes,
                          { 
                            id: ''+nodes.length, 
                            position: { x: 20, y: 20 }, 
                            data: { label: 'API' },
                            targetPosition: 'left',
                            sourcePosition: 'right',
                          }
                        ]
                      )}
                      >
                        <b>API</b>
                      </Button>
                  </Grid>
                </Grid>
              </InItem>
            </OutItem>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <OutItem elevation={5}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={10}>
                  <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>
                    Flow
                  </h2>
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                  <Button sx={{marginTop:'0.5vh'}} onClick={() => verifyFlow()} variant="contained">
                    APPLY FLOW
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
                  >
                    <Background variant="dots" gap={12} size={1} />
                  </ReactFlow>
                </div>
              </InItem>
            </OutItem>
          </Grid>
      </Grid>
    </>    
  );
}
