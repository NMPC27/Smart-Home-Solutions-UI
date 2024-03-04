import React, { memo } from 'react';
import IconButton from "@mui/material/IconButton";
import LightbulbIcon from '@mui/icons-material/Lightbulb';

export default memo(({ id, isConnectable }) => {

  return (
    <>
      <IconButton>
          <LightbulbIcon />
      </IconButton>
    </>
  );
});