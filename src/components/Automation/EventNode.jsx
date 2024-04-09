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
    const [humidity, setHumidity] = React.useState(50);
    const [sensor, setSensor] = React.useState("notDetected");
    const [sinal, setSinal] = React.useState("=");


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

    const plusHumi = () => {
      if (humidity < 100){
        setHumidity(humidity + 5)
      }
    }

    const minusHumi = () => {
      if (humidity > 0) {
        setHumidity(humidity - 5)
      }
    } 

    const handleDeleteEvent = (e) => {
      e.stopPropagation();
      deleteElements({ nodes: [{ id }] });
    }


  return (
    <>
      <div>
        <b>Event Device:</b>
      </div>
      <select 
        className="nodrag" 
        style={{backgroundColor:'#FFFFFF', color:'#000000'}} 
        value={deviceIdx} 
        onChange={e => handleChangeDevice(e.target.value)} 
      >
        {data.devices.map((device, idx) => {
          if (device.type === "Temperature Sensor" || device.type === "Motion Sensor" || device.type === "Humidity Sensor") {
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
      { data.devices[deviceIdx].type === "Temperature Sensor" &&
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
                    value={sinal+" "+temperature+"°C"} 
                    readonly
                />
                <button 
                    style={{marginLeft:"0.5vw"}} 
                    onClick={() => plusTemp()}
                >
                    +
                </button>
            </div>
            <div className="nodrag" style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                <button 
                    style={{marginRight:"1vw"}} 
                    onClick={() => setSinal("<")}
                >
                    {"<"}
                </button>
                <button 
                    style={{}} 
                    onClick={() => setSinal("=")}
                >
                    =
                </button>
                <button 

                    style={{marginLeft:"1vw"}} 
                    onClick={() => setSinal(">")}
                >
                    {">"}
                </button>
            </div>
        </>
      }
      { data.devices[deviceIdx].type === "Humidity Sensor" &&
        <>
            <div>
                <b>Humidity:</b>
            </div>
            <div className="nodrag" style={{display:"flex", flexDirection:"row"}}>
                <button 
                    style={{marginRight:"0.5vw"}} 
                    onClick={() => minusHumi()}
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
                    value={sinal+" "+humidity+"%"} 
                    readonly
                />
                <button 
                    style={{marginLeft:"0.5vw"}} 
                    onClick={() => plusHumi()}
                >
                    +
                </button>
            </div>
            <div className="nodrag" style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                <button 
                    style={{marginRight:"1vw"}} 
                    onClick={() => setSinal("<")}
                >
                    {"<"}
                </button>
                <button 
                    style={{}} 
                    onClick={() => setSinal("=")}
                >
                    =
                </button>
                <button 

                    style={{marginLeft:"1vw"}} 
                    onClick={() => setSinal(">")}
                >
                    {">"}
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
