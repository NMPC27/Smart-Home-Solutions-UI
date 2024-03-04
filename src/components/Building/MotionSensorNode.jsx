import React, { memo } from 'react';
import IconButton from "@mui/material/IconButton";
import SensorsIcon from '@mui/icons-material/Sensors';

export default memo(({ id, isConnectable }) => {

  return (
    <>
      <IconButton>
          <SensorsIcon />
      </IconButton>
    </>
  );
});
