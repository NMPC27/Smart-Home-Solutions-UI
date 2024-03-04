import React, { memo } from 'react';
import IconButton from "@mui/material/IconButton";
import VideocamIcon from '@mui/icons-material/Videocam';

export default memo(({ id, isConnectable }) => {

  return (
    <>
      <IconButton>
          <VideocamIcon />
      </IconButton>
    </>
  );
});