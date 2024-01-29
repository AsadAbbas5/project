import { Alert, Avatar, Box, Button, IconButton, Snackbar, TextField, Typography } from '@mui/material'
import axios  from 'axios'
import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { updateuserActin } from '../../../store/action/actionType/updateuserAction'


function GetProfile({ user }) {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);

  const [username, setusername] = useState(user.userName)

  const [useremail, setuseremail] = useState(user.email)
  const [userPassword, setuserPassword] = useState()

  const [profileImageUrl, setProfileImageUrl] = useState("/path/to/default/avata.jpg")

  const handleAvatarChange = (event) => {

    const render = event.target.files[0]

    if (render) {
      const renders = new FileReader()
      renders.onload=()=>{
          setProfileImageUrl(renders.result)
      }

      renders.readAsDataURL(render)

    }else{
      axios.post("/api/user/profilePitcuer").then(
        res=>console.log(res)
      ).catch(error=> console.log(error))
    }
  }


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleuserupdate = () => {
    if (!username || !useremail || !userPassword) {
      alert("plz Enter Your All Field")
    } else {
      const data = {
        username,
        useremail,
        userPassword
      }

      axios.post("/api/user/updateuser", { ...data, id: user._id }).then(
        res => {
          setOpen(true)
          dispatch({ type: updateuserActin.ADD_UPDATE_USER, data: res.updateUser })
        }
      ).catch(error =>
        console.log(error))
    }
  }

  return (
    <Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          style={{ position: 'fixed', top: "7rem", left: '75%', transform: 'translateX(-50%)' }}
        >
          <Typography>User update successfully</Typography>
        </Alert>

      </Snackbar>
      <Box textAlign={"center"} marginTop={"2rem"}>
        <Typography fontSize={"2rem"} fontWeight={700} color={"blue"}>
          User Profile
        </Typography>
        <input type='file' onChange={handleAvatarChange} accept='image/*' />
        <Avatar

          src={profileImageUrl}
          alt='User avatar'
          sx={{
            marginLeft: "35rem",
            marginTop: "1rem",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
          }}
          sizes='large'
        />
      </Box>
      <Box display={'flex'} marginTop={"2rem"}>
        <Box >
          <TextField value={username} onChange={(event) => setusername(event.target.value)} sx={{ width: "250%", marginLeft: "1rem" }} placeholder='Enter Your user name...' label="Enter Your  user  Name..." size='small' />
        </Box>

        <Box>
          <TextField value={useremail} onChange={(event) => setuseremail(event.target.value)} sx={{ width: "300%", marginLeft: "180%" }} type='email' placeholder='Enter Your user Email...' label="Enter Your  user  Email..." size='small' />
        </Box>
      </Box>
      <Box marginTop={"2rem"}  >
        <TextField sx={{ width: "45%", marginLeft: "1rem" }} value={userPassword} onChange={(event) => setuserPassword(event.target.value)} placeholder='Enter Your user password...' label="Enter Your  user  Password..." type='password' size='small' />
      </Box>

      <Box textAlign={"center"} marginTop={"2rem"}>
        <Button onClick={handleuserupdate} variant='contained' sx={{ width: "20%" }}>
          update
        </Button>
      </Box>
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(GetProfile)