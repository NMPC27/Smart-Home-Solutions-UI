import React, { memo } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";


export default memo(({ id, isConnectable }) => {

  const { deleteElements } = useReactFlow();

  const [hour, setHour] = React.useState('00');
  const [min, setMin] = React.useState('00');
  const [sec, setSec] = React.useState('00');

  const handleDeleteWait = (e) => {
    e.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  }

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div>
        <b>Wait:</b>
      </div>
      <div className="nodrag" style={{display:"flex", flexDirection:"row"}}>
        <input 
          style={{ 
              backgroundColor: '#FFFFFF', 
              color: "#000000", 
              width: '25%', 
              textAlign: "center",
              borderRadius: "20px",
              borderColor: "#000000",
          }} 
          value={hour}       
          onChange={(e) => setHour(e.target.value)}    
        />
        <b style={{width: "10%"}} >:</b>
        <input 
          style={{ 
              backgroundColor: '#FFFFFF', 
              color: "#000000", 
              width: '25%', 
              textAlign: "center",
              borderRadius: "20px",
              borderColor: "#000000",
          }} 
          value={min} 
          onChange={(e) => setMin(e.target.value)}
        />
        <b style={{width: "10%"}} >:</b>
        <input 
          style={{ 
              backgroundColor: '#FFFFFF', 
              color: "#000000", 
              width: '25%', 
              textAlign: "center",
              borderRadius: "20px",
              borderColor: "#000000",
          }} 
          value={sec} 
          onChange={(e) => setSec(e.target.value)}
        />
      </div>
      <div className="nodrag">
          <IconButton size="small" onClick={(e) => handleDeleteWait(e)}>
              <DeleteIcon />
          </IconButton>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </>
  );
});
