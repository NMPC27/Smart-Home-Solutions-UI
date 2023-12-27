import AppBarStyled from "../components/AppBarStyled";
import LightsCard from "../components/LightsCard";
import Grid from "@mui/material/Grid";
import TemperatureCard from "../components/TemperatureCard";
import SecurityCard from "../components/SecurityCard";
import CameraCard from "../components/CameraCard";
import * as React from "react";


const roomsTMP = [
  {
    id: 1,
    name: "kitchen"
  },
  {
    id: 2,
    name: "bed"
  },
  {
    id: 3,
    name: "hallway"
  },
  {
    id: 4,
    name: "test"
  }
]

const devicesTMP = 
[
    {
        id: 1,
        type: "light",
        room: "kitchen",
        
        name: "Kitchen (user writen)",
        on: true,
        brightness: 100,
        color: "#FFFFFF"
    },
    {
        id: 2,
        type: "light",
        room: "bed",

        name: "Bedroom (user writen)",
        on: false,
        brightness: 100,
        color: "#FFFFFF"
    },
    {
        id: 3,
        type: "ac", // sensor temperature or ac
        room: "kitchen",

        name: "Kitchen ac",
        on: true,
        currentTemperature: 11,
        targetTemperature: 23,
    },
    {
        id: 4,
        type: "ac", // sensor temperature or ac
        room: "bed",

        name: "Bed ac (user writen)",
        on: false,
        currentTemperature: 7,
        targetTemperature: 20,
    },
    {
        id: 4,
        type: "ac", // sensor temperature or ac
        room: "hallway",

        name: "hallway ac (user writen)",
        on: true,
        currentTemperature: 7,
        targetTemperature: 20,
    },
    { //! ATENÇAO NAO MT BEM DEFINIDO
        id: 5,
        type: "motionSensor", // security and can be used for ligths in automation
        room: "bed",

        name: "sensor bed (user writen)",
        on: true,
        detectedMotion: true,
    },
    {
        id: 6,
        type: "camera",
        room: "bed",

        name: "Hallway #2",
        endpoint: "c4.png",
    },
    {
        id: 7,
        type: "camera",
        room: "kitchen",

        name: "Hallway #1",
        endpoint: "c3.png",
  },
]


export default function Dashboard() {

  const [devices, setDevices] = React.useState(devicesTMP);
  const [rooms, setRooms] = React.useState(roomsTMP);


  const handleDeviceAdd = (deviceInfo,deviceName,type,room) => {
    //! API CALL
    let newID = devices[devices.length-1].id + 1

    for(let i=0;i<devices.length;i++){
      if (devices[i].id >= newID){
        newID=devices[i].id+1
      }
    }

    if (type==="light"){
      setDevices([...devices,{id:newID,type:type,room:room,name: deviceName,on: false,brightness: 100,color: "#FFFFFF"}]);
    }

    if (type==="ac"){
      setDevices([...devices,{id:newID,type:type,room:room,name: deviceName,on: false,currentTemperature: 0,targetTemperature: 15}]);
    }

    if (type==="motionSensor"){
      setDevices([...devices,{id:newID,type:type,room:room,name: deviceName,on: false,detectedMotion: false}]);
    }

    if (type==="camera"){
      setDevices([...devices,{id:newID,type:type,room:room,name: deviceName,endpoint: "c1.png"}]);
    }

  };

  const handleDeleteDevice = (idx) => {
    //! API CALL

    let tmp = [...devices];
    tmp.splice(idx, 1);
    setDevices(tmp);
  };

  const handleRoomAdd = (val) => {
    //! API CALL
    let newID = rooms[rooms.length-1].id + 1

    for(let i=0;i<rooms.length;i++){
      if (rooms[i].id >= newID){
        newID=rooms[i].id+1
      }
    }

    setRooms([...rooms,{id:newID,name: val}]);
  };

  const handleDeleteRoom = (idx) => {
    //! API CALL

    let tmp = [...rooms];
    tmp.splice(idx, 1);
    setRooms(tmp);
  };

  const handleTemperatureTarget = (val,idx) => {
    const newTemp = parseInt(val);
    //! API CALL

    let tmp = [...devices];
    tmp[idx].targetTemperature = newTemp;
    setDevices(tmp);
  };

  const handleMinusTemperature = (idx) => {
    const newTemp = parseInt(devices[idx].targetTemperature - 1);
    if (devices[idx].on) {
      if (newTemp >= 15) {

        //! API CALL

        let tmp = [...devices];
        tmp[idx].targetTemperature = newTemp;
        setDevices(tmp);
      }
    }
  };

  const handlePlusTemperature = (idx) => {
    const newTemp = parseInt(devices[idx].targetTemperature + 1);
    if (devices[idx].on) {
      if (newTemp <= 30) {

        //! API CALL

        let tmp = [...devices];
        tmp[idx].targetTemperature = newTemp;
        setDevices(tmp);
      }
    }
  };

  const handleTemperatureOnOff = (idx) => {
    //! API CALL

    let tmp = [...devices];
    tmp[idx].on = !tmp[idx].on;
    setDevices(tmp);
  };

  const handleLightColor = (val,idx) => {
    //! API CALL

    let tmp = [...devices];
    tmp[idx].color = val;
    setDevices(tmp);
  };

  const handleBrightnessChange = (val,idx) => {
      //! API CALL

      let tmp = [...devices];
      tmp[idx].brightness = val;
      setDevices(tmp);
  };

  const handleLightOnOff = (idx) => {
      //! API CALL

      let tmp = [...devices];
      tmp[idx].on = !tmp[idx].on;
      setDevices(tmp);
  };

  return (
    <>
      <AppBarStyled 
        navbar={"dashboard"} 
        devices={devices} 
        rooms={rooms} 
        handleRoomAdd={handleRoomAdd}
        handleDeleteRoom={handleDeleteRoom}
        handleDeviceAdd={handleDeviceAdd}
        handleDeleteDevice={handleDeleteDevice}
      />

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <LightsCard 
            devices={devices} 
            rooms={rooms}
            handleLightColor={handleLightColor}
            handleBrightnessChange={handleBrightnessChange}
            handleLightOnOff={handleLightOnOff}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TemperatureCard 
            devices={devices} 
            rooms={rooms}
            handleTemperatureTarget={handleTemperatureTarget}
            handleMinusTemperature={handleMinusTemperature}
            handlePlusTemperature={handlePlusTemperature}
            handleTemperatureOnOff={handleTemperatureOnOff}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CameraCard devices={devices}/>
        </Grid>
                <Grid item xs={12} sm={6} md={2}>
          <SecurityCard />
        </Grid>
      </Grid>
    </>
  );
}
