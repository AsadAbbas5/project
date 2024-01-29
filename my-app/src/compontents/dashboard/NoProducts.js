import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

function NoProducts() {
  return (
    <Box>
      <Divider sx={{color:"black",marginTop:"2rem"}}/> 
      <Box>
        <Typography marginTop={"3rem"} textAlign={"center"} fontSize={"3rem"} fontWeight={700} color={"#000"}>
            No Products Availbal
        </Typography>
      </Box>
    </Box>
  
  
  )
}

export default NoProducts