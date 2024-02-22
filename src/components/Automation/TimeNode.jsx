import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";


export default memo(({ data, isConnectable }) => {

  const [hour, setHour] = React.useState('00');
  const [min, setMin] = React.useState('00');


  return (
    <>
      <div>
        <b>Time:</b>
      </div>
      <div className="nodrag" style={{display:"flex", flexDirection:"row"}}>
        <input 
          style={{ 
              backgroundColor: '#FFFFFF', 
              color: "#000000", 
              width: '45%', 
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
              width: '45%', 
              textAlign: "center",
              borderRadius: "20px",
              borderColor: "#000000",
          }} 
          value={min} 
          onChange={(e) => setMin(e.target.value)}
        />
      </div>
      <div className="nodrag">
          <IconButton size="small" onClick={() => handleDeleteDevice}>
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
