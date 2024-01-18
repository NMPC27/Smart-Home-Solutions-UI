import AppBarStyled from "../components/AppBar/AppBarStyled";
import LightsCard from "../components/Dashboard/LightsCard";
import Grid from "@mui/material/Grid";
import TemperatureCard from "../components/Dashboard/TemperatureCard";
import SecurityCard from "../components/Dashboard/SecurityCard";
import CameraCard from "../components/Dashboard/CameraCard";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import GridLayout from "react-grid-layout";
import {
  getDevices,
  getRooms,
  getCards,
  postDevices,
  postRooms,
  postCards,
  getNotifications,
  postNotifications
} from "../components/API";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const theme = useTheme();
  const smallPC = useMediaQuery(theme.breakpoints.down("lg"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  let navigate = useNavigate();

  React.useEffect(() => {
    if (tablet) {
      document.body.style.margin = "1vw";
    }
  }, [tablet]);




  const [sizeGrid, setSizeGrid] = React.useState(null);

    // const [numCol, setNumCol] = React.useState(() => {
  const [numCol, ] = React.useState(() => {
    if (mobile){
      return 1;
    }else if(tablet){
      return 2;
    }else{
      return 12;
    }
  });

  const dialogGrid = React.useCallback((node) => {
    //! Resize grid
    if (node !== null) {
      setSizeGrid(node.getBoundingClientRect().width);
    }
  }, []);

  const [devices, setDevices] = React.useState(null);
  const [rooms, setRooms] = React.useState(null);
  const [cards, setCards] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);

  const [globalRoom, setGlobalRoom] = React.useState("Any");

  React.useEffect(() => {
    setInterval(() => {
      getNotifications().then(
        (res) => {
          setNotifications(res.data);
        }
      )
    }
    , 5000);
  },[])

  React.useEffect(() => {
    getDevices().then(
      (res) => {
        setDevices(res.data);
      },
      () => {
        navigate("/");
      },
    );
    getRooms().then(
      (res) => {
        setRooms(res.data);
      },
      () => {
        navigate("/");
      },
    );
    getCards().then(
      (res) => {
        setCards(res.data);
      },
      () => {
        navigate("/");
      },
    );
  }, []);

  const handleDeviceAdd = (deviceInfo, deviceName, type, room) => {
    let newID;
    if (devices.length != 0) {
      newID = devices[devices.length - 1].id + 1;
    } else {
      newID = 1;
    }

    for (let i = 0; i < devices.length; i++) {
      if (devices[i].id >= newID) {
        newID = devices[i].id + 1;
      }
    }

    if (type === "Light") {
      setDevices([
        ...devices,
        {
          id: newID,
          type: type,
          room: room,
          name: deviceName,
          on: false,
          brightness: 100,
          color: "#FFFFFF",
        },
      ]);

      postDevices([
        ...devices,
        {
          id: newID,
          type: type,
          room: room,
          name: deviceName,
          on: false,
          brightness: 100,
          color: "#FFFFFF",
        },
      ]); //! API CALL
    }

    if (type === "Temperature") {
      setDevices([
        ...devices,
        {
          id: newID,
          type: type,
          room: room,
          name: deviceName,
          on: false,
          currentTemperature: 0,
          targetTemperature: 15,
        },
      ]);

      postDevices([
        ...devices,
        {
          id: newID,
          type: type,
          room: room,
          name: deviceName,
          on: false,
          currentTemperature: 0,
          targetTemperature: 15,
        },
      ]); //! API CALL
    }

    if (type === "Motion Sensor") {
      setDevices([
        ...devices,
        {
          id: newID,
          type: type,
          room: room,
          name: deviceName,
          on: false,
          detectedMotion: false,
        },
      ]);

      postDevices([
        ...devices,
        {
          id: newID,
          type: type,
          room: room,
          name: deviceName,
          on: false,
          detectedMotion: false,
        },
      ]); //! API CALL
    }

    if (type === "Camera") {
      setDevices([
        ...devices,
        {
          id: newID,
          type: type,
          room: room,
          name: deviceName,
          on: true,
          endpoint: "https://www.youtube.com/embed/BAyh4ViTMz8",
        },
      ]);

      postDevices([
        ...devices,
        {
          id: newID,
          type: type,
          room: room,
          name: deviceName,
          on: true,
          endpoint: "https://www.youtube.com/embed/BAyh4ViTMz8",
        },
      ]); //! API CALL
    }
  };

  const handleDeleteDevice = (idx) => {
    let tmp = [...devices];
    tmp.splice(idx, 1);
    setDevices(tmp);

    postDevices(tmp); //! API CALL
  };

  const handleRoomAdd = (val) => {
    let newID;
    if (rooms.length != 0) {
      newID = rooms[rooms.length - 1].id + 1;
    } else {
      newID = 1;
    }

    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].id >= newID) {
        newID = rooms[i].id + 1;
      }
    }

    setRooms([...rooms, { id: newID, name: val }]);

    postRooms([...rooms, { id: newID, name: val }]); //! API CALL
  };

  const handleDeleteRoom = (idx) => {
    let deviceDeleteIdx = [];

    devices.map((device, deviceIdx) => {
      if (device.room === rooms[idx].name) {
        deviceDeleteIdx.push(deviceIdx);
      }
    });

    let devicesTmp = [...devices];
    let deleteCount = 0;
    for (let i = 0; i < deviceDeleteIdx.length; i++) {
      devicesTmp.splice(deviceDeleteIdx[i] - deleteCount, 1);
      deleteCount++;
    }

    setDevices(devicesTmp);

    postDevices(devicesTmp); //! API CALL

    let roomsTmp = [...rooms];
    roomsTmp.splice(idx, 1);
    setRooms(roomsTmp);

    postRooms(roomsTmp); //! API CALL
  };

  const handleTemperatureTarget = (val, idx) => {
    const newTemp = parseInt(val);

    let tmp = [...devices];
    tmp[idx].targetTemperature = newTemp;
    setDevices(tmp);

    postDevices(tmp); //! API CALL
  };

  const handleMinusTemperature = (idx) => {
    let tmp = [...devices];
    tmp[idx].targetTemperature = tmp[idx].targetTemperature - 1;
    setDevices(tmp);

    postDevices(tmp); //! API CALL
  };

  const handlePlusTemperature = (idx) => {
    let tmp = [...devices];
    tmp[idx].targetTemperature = tmp[idx].targetTemperature + 1;
    setDevices(tmp);

    postDevices(tmp); //! API CALL
  };

  const handleTemperatureOnOff = (idx) => {
    let tmp = [...devices];
    tmp[idx].on = !tmp[idx].on;
    setDevices(tmp);

    postDevices(tmp); //! API CALL
  };

  const handleLightColor = (val, idx) => {
    let tmp = [...devices];
    tmp[idx].color = val;
    setDevices(tmp);

    postDevices(tmp); //! API CALL
  };

  const handleBrightnessChange = (val, idx) => {
    let tmp = [...devices];
    tmp[idx].brightness = val;
    setDevices(tmp);

    postDevices(tmp); //! API CALL
  };

  const handleLightOnOff = (idx) => {
    let tmp = [...devices];
    tmp[idx].on = !tmp[idx].on;
    setDevices(tmp);

    postDevices(tmp); //! API CALL
  };

  const handleCardAdd = (val) => {
    let newID;
    if (cards.length != 0) {
      newID = cards[cards.length - 1].i + 1;
    } else {
      newID = 0;
    }

    for (let i = 0; i < cards.length; i++) {
      if (cards[i].i >= newID) {
        newID = cards[i].i + 1;
      }
    }

    // tamanho do card

    let h=0
    let w=0
    if (val.type === "Light"){
      w=3
      h=2
    }else if(val.type === "Temperature"){
      w=3
      h=3
    }else if(val.type === "Camera"){
      w=6
      h=3
    }else if(val.type === "Motion Sensor"){
      w=3
      h=1
    }


    setCards([...cards, {type: val.type, room: val.room, i: newID.toString(), x: 0, y: Infinity, w: w, h: h }]);

    postCards([...cards, {type: val.type, room: val.room, i: newID.toString(), x: 0, y: Infinity, w: w, h: h }]); //! API CALL
  };

  const handleSetLayout = (val) => {
    setCards(val);

    postCards(val); //! API CALL
  };

  const handleCardDelete = (idx) => {
    let tmp = [...cards];
    tmp.splice(idx, 1);
    setCards(tmp);

    postCards(tmp); //! API CALL
  };

  const handleClickAlarm = (val) => {
    let tmp = [...devices];

    for (let i = 0; i < tmp.length; i++) {
      if (tmp[i].type === "Motion Sensor") {
        tmp[i].on = val;
      }
    }

    setDevices(tmp);

    postDevices(tmp); //! API CALL
  };

  const handleCameraOnOff = (idx) => {
    let tmp = [...devices];
    tmp[idx].on = !tmp[idx].on;
    setDevices(tmp);

    postDevices(tmp); //! API CALL
  };

  const handleDeleteNotification = (idx) => {
    let tmp = [...notifications];
    tmp.splice(idx, 1);
    setNotifications(tmp);

    postNotifications(tmp); //! API CALL
  };

  if (devices === null || rooms === null || cards === null) {
    return (
      <>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Skeleton
              variant="rounded"
              height="7vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton
              variant="rounded"
              height="30vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton
              variant="rounded"
              height="30vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton
              variant="rounded"
              height="30vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton
              variant="rounded"
              height="30vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton
              variant="rounded"
              height="30vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton
              variant="rounded"
              height="30vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton
              variant="rounded"
              height="30vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton
              variant="rounded"
              height="30vh"
              sx={{ borderRadius: "20px" }}
            />
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
        handleSetLayout={handleSetLayout}
        notifications={notifications}
        handleDeleteNotification={handleDeleteNotification}
      />

      <Grid container spacing={4} ref={dialogGrid}>
          <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Room</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={globalRoom}
                label="Room"
                onChange={(event) => setGlobalRoom(event.target.value)}
              >
                <MenuItem value={"Any"}>
                  Any
                </MenuItem>
                {rooms.map((room, idx) => {
                  return (
                    <MenuItem key={idx} value={room.name}>
                      {room.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          { !mobile &&
            <Grid item xs={0} sm={6} md={7} lg={8} xl={9}></Grid>
          }

      { smallPC &&
        <>
        {cards.map((card, idx) => {
          if (card.type === "Light") {
            return (
              <Grid item xs={12} sm={6} md={5} lg={4} xl={3} key={idx}>
                <LightsCard
                  devices={devices}
                  rooms={rooms}
                  handleLightColor={handleLightColor}
                  handleBrightnessChange={handleBrightnessChange}
                  handleLightOnOff={handleLightOnOff}
                  globalRoom={globalRoom}
                />
              </Grid>
            );
          }

          if (card.type === "Temperature") {
            return (
              <Grid item xs={12} sm={6} md={5} lg={4} xl={3} key={idx}>
                <TemperatureCard
                  devices={devices}
                  rooms={rooms}
                  handleTemperatureTarget={handleTemperatureTarget}
                  handleMinusTemperature={handleMinusTemperature}
                  handlePlusTemperature={handlePlusTemperature}
                  handleTemperatureOnOff={handleTemperatureOnOff}
                  globalRoom={globalRoom}
                />
              </Grid>
            );
          }

          if (card.type === "Camera") {
            return (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={idx}>
                <CameraCard 
                  devices={devices} 
                  rooms={rooms} 
                  handleCameraOnOff={handleCameraOnOff}
                  globalRoom={globalRoom}
                />
              </Grid>
            );
          }

          if (card.type === "Motion Sensor") {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={idx}>
                <SecurityCard
                  devices={devices}
                  handleClickAlarm={handleClickAlarm}
                  globalRoom={globalRoom}
                />
              </Grid>
            );
          }
        })}
        </>
      }

      </Grid>

      { !smallPC &&        
        <GridLayout 
        className="layout" 
        cols={12} 
        margin={[30, 30]} 
        rowHeight={200} 
        width={sizeGrid-40} 
        isResizable={false}
        isDraggable={false}
        layout={cards}
      >

      { cards.map((card, idx) => {

        if (card.type === "Light") {
          return (
            <div key={card.i}>
              <LightsCard
                devices={devices}
                rooms={rooms}
                handleLightColor={handleLightColor}
                handleBrightnessChange={handleBrightnessChange}
                handleLightOnOff={handleLightOnOff}
                globalRoom={globalRoom}
              />
            </div>
          );
        }

        if (card.type === "Temperature") {
          return (
            <div key={card.i}>
              <TemperatureCard
                devices={devices}
                rooms={rooms}
                handleTemperatureTarget={handleTemperatureTarget}
                handleMinusTemperature={handleMinusTemperature}
                handlePlusTemperature={handlePlusTemperature}
                handleTemperatureOnOff={handleTemperatureOnOff}
                globalRoom={globalRoom}
                sliderSize={sizeGrid/4-120}
              />
            </div>
          );
        }

        if (card.type === "Camera") {
          return (
            <div key={card.i}>
              <CameraCard 
                devices={devices} 
                rooms={rooms} 
                handleCameraOnOff={handleCameraOnOff}
                globalRoom={globalRoom}
              />
            </div>
          );
        }

        if (card.type === "Motion Sensor") {
          return (
            <div key={card.i}>
              <SecurityCard
                devices={devices}
                handleClickAlarm={handleClickAlarm}
                globalRoom={globalRoom}
              />
            </div>
          );
        }
      })
      }
      </GridLayout>

      }      
    </>
  );
}
