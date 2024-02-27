import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import React, { Component } from "react";



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

const tabsTMP = [0, 1, 2, 3, 4, 5];

export default function Draw(props) {

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
            
         TBD
            
          </div>
        </InItem>
    </OutItem>
    );
}