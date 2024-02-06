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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
  getDevices,
  getRooms,
  getCards,
  postDevices,
  postRooms,
  postCards,
  getNotifications,
  postNotifications,
} from "../components/API";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  let navigate = useNavigate();

  React.useEffect(() => {
    if (tablet) {
      document.body.style.margin = "1vw";
    }
  }, [tablet]);

  const [sizeGrid, setSizeGrid] = React.useState(null);

  const dialogGrid = React.useCallback((node) => {
    //! Resize grid
    if (node !== null) {
      setSizeGrid(node.getBoundingClientRect().width);
    }
  }, []);

  const [device, setDevice] = React.useState(()=>{
    if (mobile) { return "mobile" }
    else if (tablet) { return "tablet" }
    else { return "pc" }
  });

  const [numCol] = React.useState(() => {
    if (mobile) { return 1 } 
    else if (tablet) { return 2 } 
    else { return 4 }
  });

  const [devices, setDevices] = React.useState(null);
  const [rooms, setRooms] = React.useState(null);
  const [cards, setCards] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);

  const [globalRoom, setGlobalRoom] = React.useState("Any");
  const [selectedTab, setSelectedTab] = React.useState(0);

  React.useEffect(() => {
    setInterval(() => {
      getNotifications().then((res) => {
        setNotifications(res.data);
      });
    }, 5000);
  }, []);

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

  const editDeviceName = (idx,name) => {
    let tmp = [...devices];
    tmp[idx].name = name;

    setDevices(tmp);

    postDevices(tmp); //! API CALL
  }

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

  const editRoomName = (idx,name) => {

    let tmp_devices = [...devices];

    for(let i=0;i<tmp_devices.length;i++){
      if(tmp_devices[i].room === rooms[idx].name){
        tmp_devices[i].room = name;
      }
    }

    setDevices(tmp_devices);

    postDevices(tmp_devices);//! API CALL


    let tmp_rooms = [...rooms];
    tmp_rooms[idx].name = name;
    setRooms(tmp_rooms);

    postRooms(tmp_rooms); //! API CALL
  }

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

  const handleAddDashboard = (deviceSelected) => {
    let tmp = {...cards};
    tmp[deviceSelected].push([]);

    setCards(tmp);
    postCards(tmp);
  }

  const handleCardAdd = (deviceSelected,tab,val) => {

    let newID;
    if (cards[deviceSelected][tab].length != 0) {
      newID = cards[deviceSelected][tab][cards[deviceSelected][tab].length - 1].i + 1;
    } else {
      newID = 0;
    }

    for (let i = 0; i < cards[deviceSelected][tab].length; i++) {
      if (cards[deviceSelected][tab][i].i >= newID) {
        newID = cards[deviceSelected][tab][i].i + 1;
      }
    }

    // tamanho do card

    let card_h = 0;
    let card_w = 0;
    if (val.type === "Light") {
      card_w = 1;
      card_h = 2;
    } else if (val.type === "Temperature") {
      card_w = 1;
      card_h = 3;
    } else if (val.type === "Camera") {

      if (device === "mobile") {
        card_w = 1;
        card_h = 2;
      }else{
        card_w = 2;
        card_h = 3;
      }

    } else if (val.type === "Motion Sensor") {
      card_w = 1;
      card_h = 1;
    }

    let tmp = {...cards};

    //! it needs to be like this bc of pointers and create new objects
    //! tmp[deviceSelected][tab].push will eventualy fail it caused bugs
    let tmp2 = [...cards[deviceSelected][tab]]; 

    tmp2.push(
      {
        type: val.type,
        i: newID.toString(),
        x: 0,
        y: Infinity,
        w: card_w,
        h: card_h,
      },
    );

    tmp[deviceSelected][tab] = tmp2;

    setCards(tmp);

    postCards(tmp); //! API CALL
  };

  const handleSetLayout = (deviceSelected,tab,val) => {

    let tmp = {...cards};

    tmp[deviceSelected][tab] = val;

    setCards(tmp);
    postCards(tmp); //! API CALL
  };

  const handleCardDelete = (deviceSelected,tab,idx) => {
    let tmp = {...cards};
    tmp[deviceSelected][tab].splice(idx, 1);

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
        handleAddDashboard={handleAddDashboard}
        editRoomName={editRoomName}
        editDeviceName={editDeviceName}
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
              <MenuItem value={"Any"}>Any</MenuItem>
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
        {!mobile && <Grid item xs={0} sm={6} md={7} lg={8} xl={9}></Grid>}

        <Grid item xs={12}>
          <Tabs 
            value={selectedTab} 
            onChange={(event, newValue) => setSelectedTab(newValue)}
          >
            {cards[device].map((card, idx) => {
              return <Tab label={"Dashboard "+idx} value={idx} style={{fontWeight:"bold"}}/>
            })
            }
          </Tabs>
        </Grid>
      </Grid>

      <GridLayout
        className="layout"
        cols={numCol}
        margin={[30, 30]}
        rowHeight={200}
        width={sizeGrid - 40}
        isResizable={false}
        isDraggable={false}
        layout={cards[device][selectedTab]}
      >
        {cards[device][selectedTab].map((card) => {
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
                  sliderSize={sizeGrid / numCol - 120}
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
        })}
      </GridLayout>

    </>
  );
}
