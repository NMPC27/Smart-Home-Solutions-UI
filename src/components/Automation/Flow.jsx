import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
 
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

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

export default function Flow(props) {

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [tabs, setTabs] = React.useState(tabsTMP);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

    return (
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
    );
}