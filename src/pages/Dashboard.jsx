import AppBarStyled from "../components/AppBarStyled";
import LightsCard from "../components/LightsCard";
import Grid from "@mui/material/Grid";
import TemperatureCard from "../components/TemperatureCard";
import SecurityCard from "../components/SecurityCard";
import CameraCard from "../components/CameraCard";
import * as React from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';


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
        type: "Light",
        room: "kitchen",
        
        name: "Kitchen (user writen)",
        on: true,
        brightness: 100,
        color: "#FFFFFF"
    },
    {
        id: 2,
        type: "Light",
        room: "bed",

        name: "Bedroom (user writen)",
        on: false,
        brightness: 100,
        color: "#FFFFFF"
    },
    {
        id: 3,
        type: "Temperature", // sensor temperature or Temperature
        room: "kitchen",

        name: "Kitchen",
        on: true,
        currentTemperature: 11,
        targetTemperature: 23,
    },
    {
        id: 4,
        type: "Temperature", // sensor temperature or Temperature
        room: "bed",

        name: "Bed  (user writen)",
        on: false,
        currentTemperature: 7,
        targetTemperature: 20,
    },
    {
        id: 5,
        type: "Temperature", // sensor temperature or Temperature
        room: "hallway",

        name: "hallway (user writen)",
        on: true,
        currentTemperature: 7,
        targetTemperature: 20,
    },
    { //! ATENÇAO NAO MT BEM DEFINIDO
        id: 6,
        type: "Motion Sensor", // security and can be used for ligths in automation
        room: "bed",

        name: "sensor bed (user writen)",
        on: false,
        detectedMotion: true,
    },
    { //! ATENÇAO NAO MT BEM DEFINIDO
      id: 19,
      type: "Motion Sensor", // security and can be used for ligths in automation
      room: "kitchen",

      name: "sensor bed (user writen)",
      on: true,
      detectedMotion: true,
    },
    {
        id: 7,
        type: "Camera",
        room: "bed",

        name: "Hallway #2",
        endpoint: "c4.png",
    },
    {
        id: 8,
        type: "Camera",
        room: "kitchen",

        name: "Hallway #1",
        endpoint: "c3.png",
  },
]


const cardsTMP = [
  {
    id: 1,
    type: "Camera", 
    room: "kitchen"
  },
  {
    id: 2,
    type: "Temperature",
    room: "bed"
  },
  {
    id: 3,
    type: "Light",
    room: "kitchen"
  },  
  {
    id: 4,
    type: "Motion Sensor", 
    room: "bed"
  }
]


export default function Dashboard() {

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'))

  React.useEffect(()  => {
    if (mobile){
      document.body.style.margin = 0
    }
  },[mobile]);

  const [devices, setDevices] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);
  const [cards, setCards] = React.useState([]);


  const handleDeviceAdd = (deviceInfo,deviceName,type,room) => {
    //! API CALL
    let newID = devices[devices.length-1].id + 1

    for(let i=0;i<devices.length;i++){
      if (devices[i].id >= newID){
        newID=devices[i].id+1
      }
    }

    if (type==="Light"){
      setDevices([...devices,{id:newID,type:type,room:room,name: deviceName,on: false,brightness: 100,color: "#FFFFFF"}]);
    }

    if (type==="Temperature"){
      setDevices([...devices,{id:newID,type:type,room:room,name: deviceName,on: false,currentTemperature: 0,targetTemperature: 15}]);
    }

    if (type==="Motion Sensor"){
      setDevices([...devices,{id:newID,type:type,room:room,name: deviceName,on: false,detectedMotion: false}]);
    }

    if (type==="Camera"){
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

    let newID
    if ( rooms.length != 0 ){
      newID = rooms[rooms.length-1].id + 1
    }else {
      newID = 1
    }

    for(let i=0;i<rooms.length;i++){
      if (rooms[i].id >= newID){
        newID=rooms[i].id+1
      }
    }

    setRooms([...rooms,{id:newID,name: val}]);
  };

  const handleDeleteRoom = (idx) => {
    //! API CALL

    let deviceDeleteIdx = []

    devices.map(
      (device,deviceIdx) => {
        if (device.room === rooms[idx].name){
          deviceDeleteIdx.push(deviceIdx)
        }
      }
    )

    let deleteCount = 0
    for(let i=0;i<deviceDeleteIdx.length;i++){
        devices.splice(deviceDeleteIdx[i]-deleteCount,1)
        deleteCount++
    }

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

  const handleCardAdd = (val) => {
    //! API CALL

    let newID
    if ( cards.length != 0){
      newID = cards[cards.length-1].id + 1
    }else{
      newID = 1
    }

    for(let i=0;i<cards.length;i++){
      if (cards[i].id >= newID){
        newID=cards[i].id+1
      }
    }

    setCards([...cards,{id:newID, type: val.type, room: val.room}]);

  };

  const handleCardDelete = (idx) => {
    //! API CALL

    let tmp = [...cards];
    tmp.splice(idx, 1);
    setCards(tmp);
  };

  const handleClickAlarm = (val) => {

    let tmp = [...devices];

    for(let i=0;i<tmp.length;i++){
      if (tmp[i].type === "Motion Sensor"){
        tmp[i].on=val
      }
    }
    
    setDevices(tmp);
  }

  //! DELETE !!!
  React.useEffect( () => {
    setTimeout(()=>{
      setDevices(devicesTMP)
      setRooms(roomsTMP)
      setCards(cardsTMP)
    }, 2000)
  },[])

  if ( devices.length === 0 || rooms.length === 0 ) {
    return (
      <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Skeleton variant="rounded" height="7vh" sx={{ borderRadius:"20px" }} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rounded" height="30vh" sx={{ borderRadius:"20px" }} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rounded" height="30vh" sx={{ borderRadius:"20px" }} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rounded" height="30vh" sx={{ borderRadius:"20px" }} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rounded" height="30vh" sx={{ borderRadius:"20px" }} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rounded" height="30vh" sx={{ borderRadius:"20px" }} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rounded" height="30vh" sx={{ borderRadius:"20px" }} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rounded" height="30vh" sx={{ borderRadius:"20px" }} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rounded" height="30vh" sx={{ borderRadius:"20px" }} />
        </Grid>
      </Grid>
      </>
    );
  }

  return (
    <>
      <AppBarStyled 
        navbar={"dashboard"} 
        devices={devices} 
        rooms={rooms} 
        cards={cards}
        handleCardAdd={handleCardAdd}
        handleCardDelete={handleCardDelete}
        handleRoomAdd={handleRoomAdd}
        handleDeleteRoom={handleDeleteRoom}
        handleDeviceAdd={handleDeviceAdd}
        handleDeleteDevice={handleDeleteDevice}
      />

      <Grid container spacing={4}>
        { cards.map( (card,idx) => {

          if (card.type === "Light"){
            return(
              <Grid item xs={12} sm={6} md={3}>
                <LightsCard 
                  devices={devices} 
                  rooms={rooms}
                  handleLightColor={handleLightColor}
                  handleBrightnessChange={handleBrightnessChange}
                  handleLightOnOff={handleLightOnOff}
                />
              </Grid>
            )
          }

          if (card.type === "Temperature"){
            return(
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
            )
          }

          if (card.type === "Camera"){
            return(
              <Grid item xs={12} sm={12} md={6}>
                <CameraCard devices={devices} rooms={rooms}/>
              </Grid>
            )
          }

          if (card.type === "Motion Sensor"){
            return(
              <Grid item xs={12} sm={6} md={2}>
                <SecurityCard devices={devices} handleClickAlarm={handleClickAlarm}/>
              </Grid>
            )
          }

        })
        }
      </Grid>
    </>
  );
}
