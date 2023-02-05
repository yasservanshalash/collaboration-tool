import { Box } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const Dashboard = () => {
    const projects = useSelector((state: RootState) => state.projects.projects)
    const columns = useSelector((state: RootState) => state.columns.columns)
    const tasks = useSelector((state: RootState) => state.tasks.tasks)
  return (
    <Box sx={{mt:14}}>
        {
            projects?.map((project) => 
                <Box>
                    <h1>{project.title}</h1>
                </Box>
            )
        }
    </Box>
  )
}

export default Dashboard