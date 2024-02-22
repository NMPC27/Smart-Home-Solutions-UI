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

const tabsTMP = [0, 1, 2, 3, 4, 5];

export default function Automation() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  let navigate = useNavigate();

  React.useEffect(() => {
    if (mobile) {
      document.body.style.margin = "1vw";
    }
  }, [mobile]);

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [tabs, setTabs] = React.useState(tabsTMP);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const handleAddTab = () => {

    let tmp = [...tabs];
    tmp.push(tmp.length);

    setTabs(tmp);
  }

  const handleDeleteTab = (idx) => {
    let tmp = [...tabs];
    tmp.splice(idx, 1);
    setTabs(tmp);
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

  React.useEffect(() => {
    console.log(edges);
  }, [edges]);

  return (
    <>
      <AppBarStyled navbar={"automation"} />

      <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={3}>
            <OutItem elevation={5}>
              <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>
                Nodes
              </h2>
              <InItem>
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
                            position: { x: 20, y: 20 }, 
                            data: { label: 'Event' },
                            targetPosition: 'left',
                            sourcePosition: 'right',
                          }
                        ]
                      )}
                      >
                        Event
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
                            data: { label: 'Wait until' },
                            targetPosition: 'left',
                            sourcePosition: 'right',
                          }
                        ]
                      )}
                      >
                        Wait until
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
                            data: { label: 'Device' },
                            targetPosition: 'left',
                            sourcePosition: 'right',
                          }
                        ]
                      )}
                      >
                        Device
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
                            data: { label: 'Time' },
                            targetPosition: 'left',
                            sourcePosition: 'right',
                          }
                        ]
                      )}
                      >
                        Time
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
                        API
                      </Button>
                  </Grid>
                </Grid>
              </InItem>
            </OutItem>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <OutItem elevation={5}>
              <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>
                Flow
              </h2>
              <InItem>
                <Tabs 
                  value={selectedTab} 
                  onChange={(event, newValue) => setSelectedTab(newValue)}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {tabs.map((card, idx) => {
                    return <Tab 
                      label={          
                      <span>
                        Flow {idx} 
                        <IconButton size="small" onClick={() => handleDeleteTab(idx)}>
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
