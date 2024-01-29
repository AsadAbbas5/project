import { Box } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signin from '../signin/Signin'
import Signup from '../signup/Signup'

function Apppublic() {
  return (
    // <Box>
       <Routes>
        <Route path="/" Component={Signin}/>
        <Route path="/signup" Component={Signup}/>
      </Routes> 
    // </Box>
  )
}

export default Apppublic