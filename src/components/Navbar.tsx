
import { AppBar, Box, Toolbar } from '@mui/material'
import React from 'react'
import logo from "../assets/collab-logo-removebg-preview.png"
const Navbar = () => {
  return (
    <Box>
              <AppBar color='inherit'>
        <Toolbar>
          <img src={logo} width="100px"/>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar