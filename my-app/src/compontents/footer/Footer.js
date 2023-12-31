import { Box, Container, Divider, Typography } from '@mui/material'
import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <div>
      <Container sx={{marginTop:"10rem",borderTop:"2px blue solid"}} >
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} color={"black"} fontSize={"2rem"} padding={"1rem 0"}>
        <Typography >
            &copy; Copyright 2023 by Asad Abbas Product
        </Typography>
        <Box>
            <GitHubIcon sx={{margin:"5px", fontSize:"1.5rem"}}/>
            <FacebookIcon  sx={{margin:"5px", fontSize:"1.5rem"}}/>
            <FacebookIcon  sx={{margin:"5px", fontSize:"1.5rem"}}/>
            <InstagramIcon  sx={{margin:"5px", fontSize:"1.5rem"}}/>
        </Box>
       </Box>

      </Container>
    </div>
  )
}

export default Footer