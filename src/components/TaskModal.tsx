import { Box, Typography } from '@mui/material'
import React from 'react'
import { Task } from '../types/types'

const TaskModal = ({task}: {task: Task}) => {
  return (
    <Box sx={{position: "absolute", top: "50%", left: "50%", backgroundColor: "white", width: "1000", height: "600px"}}>
    <Typography variant='subtitle2'>{task.title}</Typography>
    <Typography variant='subtitle2'>{task.description}</Typography>
    </Box>
  )
}

export default TaskModal