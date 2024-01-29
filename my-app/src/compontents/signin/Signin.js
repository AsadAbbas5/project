import { Avatar, Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActionType } from '../../store/action/authActiontype';
import { Link, useNavigate } from 'react-router-dom';




function Signin() {
    const dispatch = useDispatch()

    const navigator = useNavigate()



    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();
    const [email, setemail] = useState()
    const [password, setPassword] = useState()
    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };


    const handleButtonClick = () => {
        if (!email || !password) {
            alert("Please Enter Your All Field")
        } else {
            const data = {
                email,
                password,
            }
            axios.post("/api/user/signin", data).then(
                res => {
                    dispatch({
                        type: authActionType.SIGN_IN, data: res.data,

                    })
                    localStorage.setItem("token", res.data.token)
                }

            ).catch(
                error => console.log(error)
            )
        }
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
        }
    };
    return (
        <Box  display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="4rem" >
            <Box bgcolor={"#fff"} padding={"4rem"} borderRadius={"1rem"}>
            <Box textAlign={"center"}>
          <Avatar sx={{ marginLeft: "7rem" }} />
          <br />
          <Typography fontWeight={"800"} fontSize={"1.5rem"}>
            SignIn
          </Typography>
        </Box>
                <Box margin={'1rem 0'}>
                    <TextField sx={{  marginTop: "1rem"  }}fullWidth size='small'
                        label="Enter Your Email.."
                        placeholder='Enter Your Email'
                        value={email}
                        type='email'
                        onChange={(event) => setemail(event.target.value)}
                        InputProps={{
                            startAdornment: (
                                <EmailIcon fontSize="small" sx={{ color: "#1d2951" }} />
                            ),
                        }}
                    />
                </Box>
                <Box margin={'1rem 0'} marginTop={"1rem"}>
                    <TextField fullWidth size='small'
                        label="Enter Your Password"
                        placeholder='Enter Your Password...'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type='Password'
                        InputProps={{
                            startAdornment: (
                                <LockOpenIcon fontSize="small" sx={{ color: "#1d2951" }} />
                            ),
                        }}
                    />
                </Box>
                <Box textAlign={"center"} marginTop={"1rem"}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>

                        <Box sx={{  marginLeft: "2rem" }}>
                            <Button
                                variant="contained"
                                    fullWidth
                                disabled={loading}
                                onClick={handleButtonClick}
                            > Sign In
                                <LockOpenIcon />

                            </Button>
                            <Typography marginTop={"1rem"} >
                                create Actount..
                                <Link to={"/signup"}>
                                    Sign Up
                                </Link>
                            </Typography>
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default Signin