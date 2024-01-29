
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { authActionType } from '../../store/action/authActiontype';



function NaveBar({ isLogined }) {
  const dispatch = useDispatch()
  const lgoout = ({ isLogined }) => {
    dispatch({ type: authActionType.LOG_OUT })
    localStorage.removeItem("token")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          {
            !isLogined ?
              <>
                <Button component={Link} to={'/'} color="inherit">Login</Button>
                <Button component={Link} to={'/signup'} color="inherit">Register</Button>
              </>
              :
              <>
                <Button component={Link} to={'/dashboard'} color="inherit">Dashboard</Button>
                <Button component={Link} to={'/get-profile'} color="inherit">Profile</Button>
                <Button component={Link} onClick={lgoout} to={"/" } sx={{backgroundColor:"#0000cd", color:"#fff"}}>Logout</Button>
              </>
          }

        </Toolbar>
    </AppBar>
    </Box>
  )
}
const mapStateToPropes = (state) => {

  return {
    isLogined: state.auth.isLogined
  }

}

export default connect(mapStateToPropes)(NaveBar) 