import { Box, Button, TextField, Typography } from '@mui/material'
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
import { useNavigate } from 'react-router-dom';




function Signin() {
            const dispatch = useDispatch()
 
const navigator = useNavigate()



    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();
    const [email, setemail] = useState()
    const [Password, setPassword] = useState()
    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };


    const handleButtonClick = () => {
        if (!email || !Password) {
            alert("Please Enter Your All Field")
        } else {
            const data = {
                email,
                Password,
            }
            axios.post("http://localhost:5000/api/user/signin", data).then(
            res =>
            {
                dispatch({type:authActionType.SIGN_IN,data:res.data,
                
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
        <Box display={"flex"} justifyContent={"center"} >
            <Box bgcolor={"#e6e6fa "} width={"25rem"} marginTop={"2rem"} height={"50vh"} borderTop={"2px solid blue"} borderRadius={"3%"}>
                <Box textAlign={"center"}>
                    <Typography fontSize={"2rem"} color={"blue"}>
                        Sign In
                    </Typography>
                </Box>
                <Box marginLeft={'1rem'}>
                    <TextField sx={{ width: "90%", marginTop: "1rem" }}
                        label="Enter Your Email"
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
                <Box marginLeft={'1rem'} marginTop={"2rem"}>
                    <TextField sx={{ width: "90%" }}
                        label="Enter Your Password"
                        placeholder='Enter Your Password...'
                        value={Password}
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

                        <Box sx={{ m: 1, position: 'relative', marginLeft: "7rem" }}>
                            <Button
                                variant="contained"
                                sx={{ width: "10rem" }}
                                disabled={loading}
                                onClick={handleButtonClick}
                            >
                                <LockOpenIcon />
                                Sign Up
                            </Button>
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