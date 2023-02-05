import { Box, Container } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../redux/store'

const Dashboard = () => {
    const projects = useSelector((state: RootState) => state.projects.projects)
    const columns = useSelector((state: RootState) => state.columns.columns)
    const tasks = useSelector((state: RootState) => state.tasks.tasks)
    const nav = useNavigate();
  return (
    <Container sx={{mt:14, display: "flex", gap: "100px"}}>
        {
            projects?.map((project) => 
                <Box sx={{backgroundColor: "rgba(255,255,255,0.8)", width: "300px", display: "flex", justifyContent: "center"}} onClick={() => {
                    nav(`/projects/${project.title}`)
                }}>
                    <h1>{project.title}</h1>
                </Box>
            )
        }
    </Container>
  )
}

export default Dashboard