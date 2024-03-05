import React, { memo } from 'react';
import IconButton from "@mui/material/IconButton";
import ThermostatIcon from '@mui/icons-material/Thermostat';

export default memo(({ id, isConnectable, data }) => {

  return (
    <>
      <IconButton onClick={()=> data.openDialog(parseInt(id),"Temperature")}>
          <ThermostatIcon />
      </IconButton>
      <p style={{marginTop: 0, marginBottom:0}}>{data.name}</p>
    </>
  );
});
