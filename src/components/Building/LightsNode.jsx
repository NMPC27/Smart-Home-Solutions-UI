import React, { memo } from 'react';
import IconButton from "@mui/material/IconButton";
import LightbulbIcon from '@mui/icons-material/Lightbulb';

export default memo(({ id, isConnectable, data }) => {

  return (
    <>
      <IconButton onClick={()=> data.openDialog(parseInt(id),"Lights")}>
          <LightbulbIcon />
      </IconButton>
      <p style={{marginTop: 0, marginBottom:0}}>{data.name}</p>
    </>
  );
});