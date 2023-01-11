import React, { FC } from 'react';
import MuiCircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CircularProgress: FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <MuiCircularProgress />
    </Box>
  );
}
export { CircularProgress }