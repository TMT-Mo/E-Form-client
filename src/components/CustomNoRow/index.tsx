import React from 'react'
import RemoveFromQueueIcon from '@mui/icons-material/RemoveFromQueue';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
const CustomNoRow = () => {
  return (
    <div className='w-full flex justify-center items-center h-full'>
        <div className='flex flex-col items-center'>
        <RemoveFromQueueIcon fontSize='large'/>
        <Box>No Row</Box>
        </div>
    </div>
  )
}

export default CustomNoRow