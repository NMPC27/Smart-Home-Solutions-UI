import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Background
} from 'reactflow';
import 'reactflow/dist/style.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";

import 'reactflow/dist/style.css';
import '../../index.css';
 
const initialNodes = [
  {
    id: '0',
    type: 'input',
    position: { x: 0, y: 50 },
  },
];

let id = 1;
const getId = () => `${id++}`;

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

export default function Draw(props) {

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [tabs, setTabs] = React.useState(tabsTMP);

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

  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const onConnect = useCallback(
    (params) => {
      // reset the start node on connections
      connectingNodeId.current = null;
      setEdges((eds) => addEdge(params, eds))
    },
    [],
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `Node ${id}` },
          origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: id }),
        );
      }
    },
    [screenToFlowPosition],
  );

    return (
      <OutItem elevation={5}>
        <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>
          Draw
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
          <div style={{ width: '100%', height: '63vh', marginTop: '1vh' }} className="wrapper" ref={reactFlowWrapper} >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onConnectStart={onConnectStart}
              onConnectEnd={onConnectEnd}
              fitView
              fitViewOptions={{ padding: 2 }}
              nodeOrigin={[0.5, 0]}
            >
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>
        </InItem>
    </OutItem>
    );
}