import React, { memo } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { useDebounce } from "use-debounce";
import Slider from "@mui/material/Slider";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";

export default memo(({ id, data, isConnectable }) => {

    const { deleteElements } = useReactFlow();

    const [deviceIdx, setDeviceIdx] = React.useState(0);
    const [temperature, setTemperature] = React.useState(20);
    const [sensor, setSensor] = React.useState("notDetected");


    const handleChangeDevice = (event) => {
        setDeviceIdx(event)
        //! do something
    };

    const handleChangeSensor = (event) => {
        setSensor(event)
        //! do something
    };

    const plusTemp = () => {
        if (temperature < 30){
            setTemperature(temperature + 1)
        }        
    }

    const minusTemp = () => {
        if (temperature > 15) {
            setTemperature(temperature - 1)
        }
    }

    const handleDeleteEvent = (e) => {
      e.stopPropagation();
      deleteElements({ nodes: [{ id }] });
    }


  return (
    <>
      <div>
        <b>Device:</b>
      </div>
      <select 
        className="nodrag" 
        style={{backgroundColor:'#FFFFFF', color:'#000000'}} 
        value={deviceIdx} 
        onChange={e => handleChangeDevice(e.target.value)} 
      >
        {data.devices.map((device, idx) => {
          if (device.type === "Temperature" || device.type === "Motion Sensor") {
            return <option key={idx} value={idx}>{device.name}</option>
          }
        })}
      </select>
      { data.devices[deviceIdx].type === "Motion Sensor" &&
        <>
            <div>
                <b>Motion:</b>
            </div>      
            <select 
              className="nodrag" 
              style={{backgroundColor:'#FFFFFF', color:'#000000'}} 
              value={sensor} 
              onChange={e => handleChangeSensor(e.target.value)} 
            >
              <option value={"notDetected"}>Not Detected</option>
              <option value={"detected"}>Detected</option>
            </select>      
        </>
      }
      { data.devices[deviceIdx].type === "Temperature" &&
        <>
            <div>
                <b>Temperature:</b>
            </div>
            <div className="nodrag" style={{display:"flex", flexDirection:"row"}}>
                <button 
                    style={{marginRight:"0.5vw"}} 
                    onClick={() => minusTemp()}
                >
                    -
                </button>
                <input 
                    style={{ 
                        backgroundColor: '#FFFFFF', 
                        color: "#000000", 
                        width: '100%', 
                        textAlign: "center",
                        borderRadius: "20px",
                        borderColor: "#000000",
                    }} 
                    value={temperature} 
                    readonly
                />
                <button 
                    style={{marginLeft:"0.5vw"}} 
                    onClick={() => plusTemp()}
                >
                    +
                </button>
            </div>
        </>
      }
        <div className="nodrag">
            <IconButton size="small" onClick={(e) => handleDeleteEvent(e)}>
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
