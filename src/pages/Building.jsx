import AppBarStyled from "../components/AppBar/AppBarStyled";
import Grid from "@mui/material/Grid";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { DrawIoEmbed } from 'react-drawio';
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from "@mui/material/TextField";
import { getDevices} from "../components/API";


const OutItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1F2937",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#FFFFFF",
  borderRadius: "20px",
}));

const InItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "20px",
}));

const tabsTMP = [0,1,2,3];

export default function Building() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  let navigate = useNavigate();

  React.useEffect(() => {
    if (mobile) {
      document.body.style.margin = "1vw";
    }
  }, [mobile]);

  const [devices, setDevices] = React.useState(null);

  React.useEffect(() => {
    getDevices().then(
      (res) => {
        setDevices(res.data);
      },
      () => {
        navigate("/");
      },
    );
  }, []);

  const [selectedTab, setSelectedTab] = React.useState(0);

  const [tabs, setTabs] = React.useState(["Floor 0"]);
  const [editIdx, setEditIdx] = React.useState(-1);
  const [tabName, setTabName] = React.useState("");

  const [imgData, setImgData] = React.useState(null);

  const [editMode, setEditMode] = React.useState(false);

  const handleAddTab = () => {

    let tmp = [...tabs];
    tmp.push("Floor "+tmp.length);

    setTabs(tmp);
  }

  const handleDeleteTab = (idx) => {
    let tmp = [...tabs];
    tmp.splice(idx, 1);
    setTabs(tmp);
  }

  
  const handleChangeTab = (newValue) => {
    setSelectedTab(newValue);

    if (tabs.length === newValue) { return; }
  }

  const handleKeyDown = (event,idx) => {
    if (event.key === "Enter") {
      handleChangeTabName(idx);
    }
  };

  const handleChangeTabName = (idx) => {
    setEditIdx(-1)

    let tmp = [...tabs];
    tmp[idx] = tabName;
    setTabs(tmp);
  }

  return (
    <>
      <AppBarStyled navbar={"building"} />

      <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={3}>
            <OutItem elevation={5}>
              <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>
              Devices
              </h2>
              <InItem>
                <Grid container spacing={4}>
                  { devices && devices.map((device, idx) => {
                    return (
                      <Grid item xs={12} sm={12} md={6}>
                        <Button fullWidth variant="contained">{device.name}</Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </InItem>
            </OutItem>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <OutItem elevation={5}>
              <Grid container spacing={0}>
                <Grid item xs={9} sm={10} md={10}>
                  <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>
                    Build
                  </h2>
                </Grid>
                <Grid item xs={3} sm={2} md={2}>
                  <Button sx={{marginTop:'0.5vh'}} onClick={() => setEditMode(!editMode)} variant="contained">
                    <b>EDIT</b>
                  </Button>
                </Grid>
              </Grid>
              <InItem>
              <Tabs 
                  value={selectedTab} 
                  onChange={(event, newValue) => handleChangeTab(newValue)}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {tabs.map((val, idx) => {
                    return <Tab
                      label={ 
                      editIdx === idx ?         
                        <span>
                          <IconButton
                            sx={{marginRight: "1vw"}}
                            onClick={() => setEditIdx(-1)}
                          >
                            <ClearIcon />
                          </IconButton>
                          <TextField
                              label="Flow Name"
                              variant="outlined"
                              size="small"
                              sx={{width: '50%'}}
                              onChange={(e) => setTabName(e.target.value)}
                              onKeyDown={(e) => handleKeyDown(e,idx)}
                            />
                          <IconButton
                            onClick={() => handleChangeTabName(idx)}
                            sx={{marginLeft: "1vw"}}
                          >
                            <CheckIcon />
                          </IconButton>   
                        </span>
                      :
                      <span>
                        <IconButton sx={{marginRight: "1vw"}} size="small" onClick={() => setEditIdx(idx)}>
                          <EditIcon />
                        </IconButton>
                        {val}
                        <IconButton sx={{marginLeft: "1vw"}} size="small" onClick={() => handleDeleteTab(idx)}>
                          <DeleteIcon />
                        </IconButton>
                      </span>
                      } 
                      value={idx} 
                      style={{fontWeight:"bold"}}/>
                  })
                  }
                  <Tab 
                    label={"+ Add"} 
                    value={tabs.length} 
                    style={{fontWeight:"bold"}}
                    onClick={() => handleAddTab()}
                  />
                
                </Tabs>
                <div style={{ width: '100%', height: '63vh', marginTop: '1vh' }} >
                  { editMode ?
                    <DrawIoEmbed 
                      xml={imgData}
                      onExport={(data) =>  setImgData(data.data)}
                      onClose={() => setEditMode(false)} 
                    />
                  :                    
                    imgData && <img src={imgData}/>
                  }                  
                </div>
                
              </InItem>
            </OutItem>
          </Grid>
      </Grid>
    </>    
  );
}
