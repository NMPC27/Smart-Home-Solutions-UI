import React, { memo } from 'react';
import IconButton from "@mui/material/IconButton";
import VideocamIcon from '@mui/icons-material/Videocam';

export default memo(({ id, isConnectable, data }) => {

  return (
    <>
      <IconButton onClick={()=> data.openDialog(parseInt(id),"Camera")} >
          <VideocamIcon />
      </IconButton>
      <p style={{marginTop: 0, marginBottom:0}}>{data.name}</p>
    </>
  );
});