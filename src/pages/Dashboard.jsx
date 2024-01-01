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
import { getDevices, getRooms, getCards, postDevices, postRooms, postCards } from "../components/API";


export default function Dashboard() {

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'))

  React.useEffect(()  => {
    if (mobile){
      document.body.style.margin = 0
    }
  },[mobile]);

  const [devices, setDevices] = React.useState(null);
  const [rooms, setRooms] = React.useState(null);
  const [cards, setCards] = React.useState(null);

  React.useEffect(()  => {
    getDevices().then((res) => {
        setDevices(res.data)
      }
    )
    getRooms().then((res) => {
        setRooms(res.data)
      }
    )
    getCards().then((res) => {
        setCards(res.data)
      }
    )  
  },[]);


  const handleDeviceAdd = (deviceInfo,deviceName,type,room) => {
    
    let newID = devices[devices.length-1].id + 1

    for(let i=0;i<devices.length;i++){
      if (devices[i].id >= newID){
        newID=devices[i].id+1
      }
    }

    if (type==="Light"){
      setDevices([...devices,{id:newID,type:type,room:room,name: deviceName,on: false,brightness: 100,color: "#FFFFFF"}]);

      postDevices([...devices,{id:newID,type:type,room:room,name: deviceName,on: false,brightness: 100,color: "#FFFFFF"}]) //! API CALL
    }

    if (type==="Temperature"){
      setDevices([...devices,{id:newID,type:type,room:room,name: deviceName,on: false,currentTemperature: 0,targetTemperature: 15}]);

      postDevices([...devices,{id:newID,type:type,room:room,name: deviceName,on: false,currentTemperature: 0,targetTemperature: 15}]) //! API CALL
    }

    if (type==="Motion Sensor"){
      setDevices([...devices,{id:newID,type:type,room:room,name: deviceName,on: false,detectedMotion: false}]);

      postDevices([...devices,{id:newID,type:type,room:room,name: deviceName,on: false,detectedMotion: false}]) //! API CALL
    }

    if (type==="Camera"){
      setDevices([...devices,{id:newID,type:type,room:room,name: deviceName,endpoint: "c1.png"}]);

      postDevices([...devices,{id:newID,type:type,room:room,name: deviceName,endpoint: "c1.png"}]) //! API CALL
    }

  };

  const handleDeleteDevice = (idx) => {

    let tmp = [...devices];
    tmp.splice(idx, 1);
    setDevices(tmp);

    postDevices(tmp); //! API CALL
  };

  const handleRoomAdd = (val) => {    

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

    postRooms([...rooms,{id:newID,name: val}]); //! API CALL
  };

  const handleDeleteRoom = (idx) => {    

    let deviceDeleteIdx = []

    devices.map(
      (device,deviceIdx) => {
        if (device.room === rooms[idx].name){
          deviceDeleteIdx.push(deviceIdx)
        }
      }
    )

    let devicesTmp = [...devices];
    let deleteCount = 0
    for(let i=0;i<deviceDeleteIdx.length;i++){
        devicesTmp.splice(deviceDeleteIdx[i]-deleteCount,1)
        deleteCount++
    }

    setDevices(devicesTmp); 

    postDevices(devicesTmp) //! API CALL

    let roomsTmp = [...rooms];
    roomsTmp.splice(idx, 1);
    setRooms(roomsTmp);

    postRooms(roomsTmp); //! API CALL
  };

  const handleTemperatureTarget = (val,idx) => {
    const newTemp = parseInt(val);    

    let tmp = [...devices];
    tmp[idx].targetTemperature = newTemp;
    setDevices(tmp);

    postDevices(tmp) //! API CALL
  };

  const handleMinusTemperature = (idx) => {
    const newTemp = parseInt(devices[idx].targetTemperature - 1);
    if (devices[idx].on) {
      if (newTemp >= 15) {

        let tmp = [...devices];
        tmp[idx].targetTemperature = newTemp;
        setDevices(tmp);

        postDevices(tmp) //! API CALL
      }
    }
  };

  const handlePlusTemperature = (idx) => {
    const newTemp = parseInt(devices[idx].targetTemperature + 1);
    if (devices[idx].on) {
      if (newTemp <= 30) {

        let tmp = [...devices];
        tmp[idx].targetTemperature = newTemp;
        setDevices(tmp);

        postDevices(tmp) //! API CALL
      }
    }
  };

  const handleTemperatureOnOff = (idx) => {

    let tmp = [...devices];
    tmp[idx].on = !tmp[idx].on;
    setDevices(tmp);

    postDevices(tmp) //! API CALL
  };

  const handleLightColor = (val,idx) => {

    let tmp = [...devices];
    tmp[idx].color = val;
    setDevices(tmp);

    postDevices(tmp) //! API CALL
  };

  const handleBrightnessChange = (val,idx) => {

      let tmp = [...devices];
      tmp[idx].brightness = val;
      setDevices(tmp);

      postDevices(tmp) //! API CALL
  };

  const handleLightOnOff = (idx) => {

      let tmp = [...devices];
      tmp[idx].on = !tmp[idx].on;
      setDevices(tmp);

      postDevices(tmp) //! API CALL
  };

  const handleCardAdd = (val) => {

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

    postCards([...cards,{id:newID, type: val.type, room: val.room}]); //! API CALL
  };

  const handleCardDelete = (idx) => {

    let tmp = [...cards];
    tmp.splice(idx, 1);
    setCards(tmp);

    postCards(tmp); //! API CALL
  };

  const handleClickAlarm = (val) => {

    let tmp = [...devices];

    for(let i=0;i<tmp.length;i++){
      if (tmp[i].type === "Motion Sensor"){
        tmp[i].on=val
      }
    }
    
    setDevices(tmp);

    postDevices(tmp) //! API CALL
  }

  if ( devices === null || rooms === null || cards === null) {
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
