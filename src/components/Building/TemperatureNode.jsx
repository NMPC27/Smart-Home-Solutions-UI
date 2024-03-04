import React, { memo } from 'react';
import IconButton from "@mui/material/IconButton";
import ThermostatIcon from '@mui/icons-material/Thermostat';

export default memo(({ id, isConnectable }) => {

  return (
    <>
      <IconButton>
          <ThermostatIcon />
      </IconButton>
    </>
  );
});
