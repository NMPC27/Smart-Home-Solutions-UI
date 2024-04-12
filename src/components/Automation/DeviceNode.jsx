import React, { memo } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { useDebounce } from "use-debounce";
import Slider from "@mui/material/Slider";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";

export default memo(({ id, data, isConnectable }) => {

    const { deleteElements } = useReactFlow();

    const [deviceIdx, setDeviceIdx] = React.useState(0);
    const [deviceState, setDeviceState] = React.useState(data.deviceState);
    const [temperature, setTemperature] = React.useState(data.temperature);
    const [color, setColor] = React.useState(data.color);
    const [brightness, setBrightness] = React.useState(data.brightness);

    const [debouncedColor] = useDebounce(color, 1000); 

    React.useEffect(()=> {
      if (data.deviceID === null) { return }

      let idx = data.devices.findIndex(device => device.id === data.deviceID)
      setDeviceIdx(idx)
    },[])

    React.useEffect(()=> {
      data.editData({id: id, color: debouncedColor})
    },[debouncedColor])

    const handleChangeDevice = (event) => {
      data.editData({id: id, deviceID: data.devices[event].id})
      setDeviceIdx(event)
    };

    const handleChangeDeviceState = (event) => {
      data.editData({id: id, deviceState: event})
      setDeviceState(event)
    };

    const plusTemp = () => {
        if (temperature < 30){
          data.editData({id: id, temperature: temperature + 1})
          setTemperature(temperature + 1)
        }        
    }

    const minusTemp = () => {
        if (temperature > 15) {
          data.editData({id: id, temperature: temperature - 1})
          setTemperature(temperature - 1)
        }
    }
    
    const handleBrightnessChange = (val) => {
      data.editData({id: id, brightness: val})
      setBrightness(val)
    }

    const handleDeleteDevice = (e) => {
      e.stopPropagation();
      data.clearNodeData(id)
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
        <b>Device:</b>
      </div>
      <select 
        className="nodrag" 
        style={{backgroundColor:'#FFFFFF', color:'#000000'}} 
        value={deviceIdx} 
        onChange={e => handleChangeDevice(e.target.value)} 
      >
        {data.devices.map((device, idx) => {
          if (device.type === "Light" || device.type === "Temperature") {
            return <option key={idx} value={idx}>{device.name}</option>
          }          
        })}
      </select>
      <div>
        <b>State:</b>
      </div>
      <select 
        className="nodrag" 
        style={{backgroundColor:'#FFFFFF', color:'#000000'}} 
        value={deviceState} 
        onChange={e => handleChangeDeviceState(e.target.value)} 
      >
        <option value={"turnOff"}>Turn Off</option>
        <option value={"turnOn"}>Turn On</option>
      </select>
      { deviceState === "turnOn" && data.devices[deviceIdx].type === "Light" &&
        <>
            <div>
                <b>Color:</b>
            </div>
            <input className="nodrag" type="color" onChange={(e) => setColor(e.target.value)} defaultValue={data.color} />
            <div>
                <b>Brightness:</b>
            </div>
            <Slider
              className="nodrag"
              defaultValue={data.brightness}
              onChangeCommitted={(_, val) =>
                handleBrightnessChange(val)
              }
              valueLabelDisplay="auto"
              sx={{
                "& .MuiSlider-thumb": { bgcolor: "#FFC107" },
                "& .MuiSlider-rail": { color: "#D9A406" },
                "& .MuiSlider-track": { color: "#FFC107" },
              }}
            />
        </>
      }
      { deviceState === "turnOn" && data.devices[deviceIdx].type === "Temperature" &&
        <>
            <div>
                <b>Set Temperature:</b>
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
            <IconButton size="small" onClick={(e) => handleDeleteDevice(e)}>
                <DeleteIcon />
            </IconButton>
        </div>
    </>
  );
});
