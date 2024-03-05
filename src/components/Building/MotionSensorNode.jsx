import React, { memo } from 'react';
import IconButton from "@mui/material/IconButton";
import SensorsIcon from '@mui/icons-material/Sensors';

export default memo(({ id, isConnectable, data }) => {

  return (
    <>
      <IconButton>
          <SensorsIcon />
      </IconButton>
      <p style={{marginTop: 0, marginBottom:0}}>{data.name}</p>
    </>
  );
});
