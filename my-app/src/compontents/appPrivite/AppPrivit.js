import { Box, Switch } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Templete from '../templete/Templete'
import Signin from '../signin/Signin'
import Signup from '../signup/Signup'
import GetProfile from '../dashboard/getProfile/GetProfile'
import { CheckBoxOutlineBlank } from '@mui/icons-material'
import Dasshboard from '../dashboard/Dasshboard/Dasshboard'

function AppPrivit() {
    return (
        <Box height={"80%"}>
            <Routes> 
                <Route path="/" Component={Dashboard} />
                <Route path="/get-profile" Component={GetProfile} />
                <Route path="/dashboard" Component={Dasshboard} />
                
            </Routes>
        </Box>
    )
}

export default AppPrivit;