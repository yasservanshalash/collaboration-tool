import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { AppBar, Box, Container, Toolbar } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { Column as ColumnType, Task } from './types/types'
import Column from './components/Column'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import ProjectDashboard from './pages/ProjectDashboard'
import logo from "./assets/collab-logo-removebg-preview.png"
import Dashboard from './pages/Dashboard'
function App() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks)
  console.log(tasks)  
  const projects = useSelector((state: RootState) => state.projects.projects)
  console.log(projects)  
  const columns = useSelector((state: RootState) => state.columns.columns)
  console.log(columns)  
  return (
    <Box className="App" sx={{display: "flex", flexDirection: "column"}}>
      <Box sx={{position: "absolute", top: "0px"}}>
      <Navbar/>
      </Box>
      <Box sx={{height: "100vh", overflowY: "scroll", overflowX: "scroll", flex: "1", flexGrow: "1"}}>
      <Routes>
        <Route path="/" element={<ProjectDashboard columns={columns} tasks={tasks}/>} />
        <Route path="/projects" element={<Dashboard />} />
        <Route path="/projects/:name" element={<ProjectDashboard columns={columns} tasks={tasks}/>} />
      </Routes>
      </Box>

    </Box>
  )
}

export default App
