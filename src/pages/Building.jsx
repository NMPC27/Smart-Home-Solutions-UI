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

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [tabs, setTabs] = React.useState(tabsTMP);

  const handleAddTab = () => {

    let tmp = [...tabs];
    tmp.push(tmp.length);

    setTabs(tmp);
  }

  const handleDeleteTab = (idx) => {
    let tmp = [...tabs];
    tmp.splice(idx, 1);
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
              
              <Button variant="contained">Event</Button>
              <Button variant="contained">Wait until</Button>
              <Button variant="contained">Device</Button>
              <Button variant="contained">Time</Button>
              <Button variant="contained">API</Button>

              </InItem>
            </OutItem>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <OutItem elevation={5}>
              <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>
                Draw
              </h2>
              <InItem>
                <Tabs 
                  value={selectedTab} 
                  onChange={(event, newValue) => setSelectedTab(newValue)}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {tabs.map((card, idx) => {
                    return <Tab 
                      label={          
                      <span>
                        Flow {idx} 
                        <IconButton size="small" onClick={() => handleDeleteTab(idx)}>
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

                </div>
              </InItem>
            </OutItem>
          </Grid>
      </Grid>
    </>    
  );
}
