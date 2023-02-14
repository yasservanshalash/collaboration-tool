import { Box, IconButton, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react'
import { Task as TaskType } from '../types/types'
import TaskModal from './TaskModal';
import "./Task.css"
const Task = ({task}: {task: TaskType}) => {
  const [taskClicked, setTaskClicked] = useState(false);
  return (
    <Box sx={{my: 1,px:2,py:1,backgroundColor: "white", borderRadius: "6px",boxShadow: "1px 4px 3px -3px #000000", whiteSpace: "nowrap", overflow: "hidden", overflowWrap: "break-word",whiteSpace: "pre-wrap"}} className="task" onClick={() => setTaskClicked(!taskClicked)}>
        <Typography variant='subtitle2'>{task.title}</Typography>
        <Box sx={{ display: taskClicked ? "block" : "none" }}>
        <Typography variant='subtitle2'>{task.description}</Typography>
        </Box>
    </Box>
  )
}

export default Task