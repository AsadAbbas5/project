import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div >
      <div  style={{display:"flex"}}>
      
        <Link to={'/get-profile'} style={{marginLeft:"35rem"}}>
       
            get Profile
        </Link>
     
        <br />
        <Link to={'/dashboard'} style={{marginLeft:"9rem"}}>
              Dashboard
        </Link>
      </div>
    </div>
  )
}

export default Dashboard