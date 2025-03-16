import { AppBar, Box, Toolbar } from '@mui/material'
import React from 'react'
import logo from "../assets/collab-logo-removebg-preview.png"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box>
      <AppBar color='inherit'>
        <Toolbar>
          <Link to="/">
            <img src={logo} width="100px"/>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar