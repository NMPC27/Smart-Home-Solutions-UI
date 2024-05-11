import AppBarStyled from "../components/AppBar/AppBarStyled";
import LightsCard from "../components/Dashboard/LightsCard";
import MotionSensorCard from "../components/Dashboard/MotionSensorCard";
import Grid from "@mui/material/Grid";
import TemperatureCard from "../components/Dashboard/TemperatureCard";
import TemperatureSensorCard from "../components/Dashboard/TemperatureSensorCard";
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
  deviceEdit,
  deviceOn,
  deviceTemperatureTarget,
  deviceLightColor,
  deviceLightBrightness,
  deviceAlarm,
  roomAdd,
  roomEdit,
  roomRemove,
  dashboardAdd,
  dashboardRemove,
  dashboardCardAdd,
  dashboardCardEdit,
  dashboardCardRemove,
  getNotifications,
  notificationsDelete,
} from "../components/API";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down("xl"));
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  let navigate = useNavigate();

  React.useEffect(() => {
    if (tablet) {
      document.body.style.margin = "1vw";
    } else {
      document.body.style.margin = "5vw";
      document.body.style.marginTop = "3vh";
    }
  }, [tablet]);

  const [sizeGrid, setSizeGrid] = React.useState(null);

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
        // Depending on the layout, you may need to swap inlineSize with blockSize
        // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
        setSizeGrid(event[0].contentBoxSize[0].inlineSize); // to match new with
    });

    const resizer = setInterval(() => { 

      if (document.getElementById("dialogGrid") !== null) { 
        resizeObserver.observe(document.getElementById("dialogGrid"));
        clearInterval(resizer);
      }
     },100)
    
  },[]);

  const [device, setDevice] = React.useState(()=>{
    if (mobile) { return "mobile" }
    else if (tablet) { return "tablet" }
    else { return "pc" }
  });

  const [numCol, setNumCol] = React.useState(() => {
    if (mobile) { return 1 } 
    else if (tablet) { return 2 } 
    else { return 4 }
  });

  React.useEffect(() => {
    if (mobile) {  setNumCol(1); setDevice("mobile") } 
    else if (tablet) { setNumCol(2); setDevice("tablet") }
    else { setNumCol(4); setDevice("pc") }
  },[tablet,mobile]);

  const [devices, setDevices] = React.useState(null);
  const [rooms, setRooms] = React.useState(null);
  const [cards, setCards] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);

  const [globalRoom, setGlobalRoom] = React.useState("Any");
  const [selectedTab, setSelectedTab] = React.useState(0);

  const [alarmOn, setAlarmOn] = React.useState(false)

  React.useEffect(() => { //first load
    getNotifications().then((res) => {
      setNotifications(res.data);
    });
  }, []);

  React.useEffect(() => {

    if (alarmOn) { 
      const interval = setInterval(() => {
        getNotifications().then((res) => {
          setNotifications(res.data);
        });
      }, 5000);

      return () => clearInterval(interval);
    }

  }, [alarmOn]);

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

  const editDevice = (idx,name,room) => {
    let tmp = [...devices];
    tmp[idx].name = name;
    tmp[idx].room = room;

    setDevices(tmp);

    deviceEdit({id: tmp[idx].id, name: name, room: room}); //! API CALL
  }

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

    roomAdd({ id: newID, name: val }); //! API CALL
  };

  const editRoomName = (idx,name) => {

    let tmp_devices = [...devices];

    for(let i=0;i<tmp_devices.length;i++){
      if(tmp_devices[i].room === rooms[idx].name){
        tmp_devices[i].room = name;
      }
    }

    setDevices(tmp_devices);

    let tmp_rooms = [...rooms];
    let oldName = tmp_rooms[idx].name;
    tmp_rooms[idx].name = name;
    setRooms(tmp_rooms);

    roomEdit({ id: tmp_rooms[idx].id, newName: name, oldName: oldName }); //! API CALL ja trata da modificação dos devices
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

    let roomsTmp = [...rooms];
    let id = roomsTmp[idx].id;
    let name = roomsTmp[idx].name;
    roomsTmp.splice(idx, 1);
    setRooms(roomsTmp);

    roomRemove({id: id, name: name}); //! API CALL ja trata da modificação dos devices
  };

  const handleTemperatureTarget = (val, idx) => {
    const newTemp = parseInt(val);

    let tmp = [...devices];
    tmp[idx].targetTemperature = newTemp;
    setDevices(tmp);

    deviceTemperatureTarget({ id: tmp[idx].id, targetTemperature: newTemp })//! API CALL
  };

  const handleMinusTemperature = (idx) => {
    let tmp = [...devices];
    let newTemp = tmp[idx].targetTemperature - 1;
    tmp[idx].targetTemperature = newTemp;
    setDevices(tmp);

    
    deviceTemperatureTarget({ id: tmp[idx].id, targetTemperature: newTemp })//! API CALL
  };

  const handlePlusTemperature = (idx) => {
    let tmp = [...devices];
    let newTemp = tmp[idx].targetTemperature + 1;
    tmp[idx].targetTemperature = newTemp;
    setDevices(tmp);

    deviceTemperatureTarget({ id: tmp[idx].id, targetTemperature: newTemp })//! API CALL
  };

  const handleTemperatureOnOff = (idx) => {
    let tmp = [...devices];
    tmp[idx].on = !tmp[idx].on;
    setDevices(tmp);

    deviceOn({ id: tmp[idx].id, on: tmp[idx].on })//! API CALL
  };

  const handleLightColor = (val, idx) => {
    let tmp = [...devices];
    tmp[idx].color = val;
    setDevices(tmp);

    deviceLightColor({ id: tmp[idx].id, color: val})//! API CALL
  };

  const handleBrightnessChange = (val, idx) => {
    let tmp = [...devices];
    tmp[idx].brightness = val;
    setDevices(tmp);

    deviceLightBrightness({ id: tmp[idx].id, brightness: val}) //! API CALL
  };

  const handleLightOnOff = (idx) => {
    let tmp = [...devices];
    tmp[idx].on = !tmp[idx].on;
    setDevices(tmp);

    deviceOn({ id: tmp[idx].id, on: tmp[idx].on })//! API CALL
  };

  const handleAddDashboard = (deviceSelected) => {
    let tmp = {...cards};
    tmp[deviceSelected].push([]);

    setCards(tmp);
    dashboardAdd({deviceSelected: deviceSelected}); //! API CALL
  }

  const handleDeleteDashboard = (deviceSelected,idx) => {
    let tmp = {...cards};
    tmp[deviceSelected].splice(idx, 1);

    let tab = idx - 1
    if (tab < 0) { tab = 0 }
    setSelectedTab(tab)
    
    setCards(tmp);
    dashboardRemove({deviceSelected: deviceSelected, tab: idx}); //! API CALL
  }

  const handleCardAdd = (deviceSelected,tab,selectedType) => {

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
    if (selectedType === "Light") {
      card_w = 1;
      card_h = 2;
    } else if (selectedType === "Temperature") {
      card_w = 1;
      card_h = 3;
    } else if (selectedType === "Camera") {

      if (device === "mobile") {
        card_w = 1;
        card_h = 2;
      }else{
        card_w = 2;
        card_h = 3;
      }

    } else if (selectedType === "Motion Sensor") {
      card_w = 1;
      card_h = 2;
    } else if (selectedType === "Security") {
      card_w = 1;
      card_h = 1;
    } else if (selectedType === "Temperature Sensor") {
      card_w = 1;
      card_h = 2;
    }

    let tmp = {...cards};

    //! it needs to be like this bc of pointers and create new objects
    //! tmp[deviceSelected][tab].push will eventualy fail it caused bugs
    let tmp2 = [...cards[deviceSelected][tab]]; 

    tmp2.push(
      {
        type: selectedType,
        i: newID.toString(),
        x: 0,
        y: Infinity,
        w: card_w,
        h: card_h,
      },
    );

    tmp[deviceSelected][tab] = tmp2;

    setCards(tmp);

    dashboardCardAdd({
      deviceSelected: deviceSelected,
      tab: tab,
      card: {
        type: selectedType,
        i: newID.toString(),
        x: 0,
        y: Infinity,
        w: card_w,
        h: card_h,
      }
    }); //! API CALL
  };

  const handleSetLayout = (deviceSelected,tab,val) => {

    let tmp = {...cards};

    tmp[deviceSelected][tab] = val;

    setCards(tmp);
    dashboardCardEdit({deviceSelected: deviceSelected, tab: tab, layout: val}); //! API CALL
  };

  const handleCardDelete = (deviceSelected,tab,idx) => {
    let tmp = {...cards};
    tmp[deviceSelected][tab].splice(idx, 1);

    setCards(tmp);
    dashboardCardRemove({deviceSelected: deviceSelected, tab: tab, idx: idx}); //! API CALL
  };

  const handleClickAlarm = (val) => {
    let tmp = [...devices];

    for (let i = 0; i < tmp.length; i++) {
      if (tmp[i].type === "Motion Sensor") {
        tmp[i].on = val;
      }
    }

    setDevices(tmp);

    setAlarmOn(val);

    deviceAlarm({on: val}); //! API CALL
  };

  const handleCameraOnOff = (idx) => {
    let tmp = [...devices];
    tmp[idx].on = !tmp[idx].on;
    setDevices(tmp);

    deviceOn({ id: tmp[idx].id, on: tmp[idx].on })//! API CALL
  };

  const handleDeleteNotification = (idx) => {
    let tmp = [...notifications];
    let id = tmp[idx].id;
    tmp.splice(idx, 1);
    setNotifications(tmp);

    notificationsDelete({"id":id}); //! API CALL
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
          <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
            <Skeleton
              variant="rounded"
              height="30vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
            <Skeleton
              variant="rounded"
              height="30vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
            <Skeleton
              variant="rounded"
              height="30vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
            <Skeleton
              variant="rounded"
              height="30vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
            <Skeleton
              variant="rounded"
              height="30vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
            <Skeleton
              variant="rounded"
              height="30vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
            <Skeleton
              variant="rounded"
              height="30vh"
              sx={{ borderRadius: "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
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
        handleSetLayout={handleSetLayout}
        notifications={notifications}
        handleDeleteNotification={handleDeleteNotification}
        handleAddDashboard={handleAddDashboard}
        editRoomName={editRoomName}
        editDevice={editDevice}
        handleDeleteDashboard={handleDeleteDashboard}
      />

      <Grid container spacing={4}>
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

        <Grid item xs={12} id="dialogGrid">
          <Tabs 
            value={selectedTab} 
            onChange={(event, newValue) => setSelectedTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{color: "#000000"}}
          >
            {cards[device].map((card, idx) => {
              return <Tab label={"Dashboard "+idx} value={idx} style={{fontWeight:"bold"}} key={idx}/>
            })
            }
          </Tabs>
        </Grid>
      </Grid>

      <GridLayout
        style={{ marginLeft: -40, marginRight: 40}}
        className="layout"
        cols={numCol}
        margin={[40,40]}
        rowHeight={200}
        width={sizeGrid+80}
        isResizable={false}
        isDraggable={false}
        layout={cards[device][selectedTab]}
        resizeHandles={[]}
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
                <MotionSensorCard
                  devices={devices}
                  rooms={rooms}
                  globalRoom={globalRoom}
                />
              </div>
            );
          }

          if (card.type === "Temperature Sensor") {
            return (
              <div key={card.i}>
                <TemperatureSensorCard
                  devices={devices}
                  rooms={rooms}
                  globalRoom={globalRoom}
                />
              </div>
            );
          }

          if (card.type === "Security") {
            return (
              <div key={card.i}>
                <SecurityCard
                  devices={devices}
                  handleClickAlarm={handleClickAlarm}
                  alarmOn={alarmOn}
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
