import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';


function Signup() {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const [firstName, setFirstName] = useState()
    const [lastName, setlastName] = useState()
    const [email, setemail] = useState()
    const [Password, setPassword] = useState()
    const [ConfirmPassword, setConfirmPassword] = useState()



    const timer = React.useRef();
    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);
    const handleButtonClick = () => {
        if (!firstName || !lastName || !email || !Password || !ConfirmPassword) {
            alert("Enter Your Fill All Field")
        } else {
            const data = {
                firstName,
                lastName,
                email,
                Password,
                ConfirmPassword
            }
            axios.post("http://localhost:5000/api/user/signup", data).then(
                res => console.log(res)
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
        <Box display={"flex"} justifyContent={"center"} marginTop={"1rem"} >
            <Box bgcolor={"#f8f4ff "} width={"30rem"} borderRadius={"3%"} >
                <Box textAlign={"center"}>

                    <Typography fontSize={"2rem"} fontWeight={700} color={"#1d2951"} fontFamily={"Noto Sans', sans-serif"}>
                        Sign up

                    </Typography>
                </Box>
                <Box marginTop={"3rem"}>
                    <TextField

                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        sx={{ width: '80%', marginLeft: '2rem' }}
                        label="Enter Your First Name..."
                        placeholder="First Name.."
                        InputProps={{
                            startAdornment: (
                                <PermIdentityIcon fontSize="small" sx={{ color: "#1d2951" }} />
                            ),
                        }}

                    />
                </Box>
                <Box marginTop={"2rem"}>

                    <TextField sx={{ width: "80%", marginLeft: "2rem" }} label="Enter Your Last Name..." placeholder='Last Name..'

                        value={lastName}
                        onChange={(event) => setlastName(event.target.value)}

                        InputProps={{
                            startAdornment: (
                                <PermIdentityIcon fontSize="small" sx={{ color: "#1d2951" }} />
                            ),
                        }}
                    />
                </Box>
                <Box marginTop={"2rem"}>

                    <TextField sx={{ width: "80%", marginLeft: "2rem" }} label="Enter Your Email" type='Email' placeholder='Email..'

                        value={email}
                        onChange={(event) => setemail(event.target.value)}

                        InputProps={{
                            startAdornment: (
                                <EmailIcon fontSize="small" sx={{ color: "#1d2951" }} />
                            ),
                        }}

                    />
                </Box>
                <Box marginTop={"2rem"}>
                    <TextField sx={{ width: "80%", marginLeft: "2rem" }} label="Enter Your Password..." placeholder='Password..' type='Password'

                        value={Password}
                        onChange={(event) => setPassword(event.target.value)}

                        InputProps={{
                            startAdornment: (
                                <VpnKeyIcon fontSize="small" sx={{ color: "#1d2951" }} />
                            ),
                        }}
                    />
                </Box>
                <Box marginTop={"2rem"}>


                    <TextField sx={{ width: "80%", marginLeft: "2rem" }} label="Enter Your Confirm -Password.." placeholder='Confirm-Password...' type='Password'

                        value={ConfirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        InputProps={{
                            startAdornment: (
                                <VpnKeyIcon fontSize="small" sx={{ color: "#1d2951" }} />
                            ),
                        }}
                    />
                </Box>
                <Box textAlign={"center"} marginTop={"1rem"}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ m: 1, position: 'relative' }}>


                        </Box>
                        <Box sx={{ m: 1, position: 'relative', }}>
                            <Button
                                variant="contained"
                                sx={{ bgcolor: "1d2951", marginLeft: "6rem", }}
                                fullWidth
                                disabled={loading}
                                onClick={handleButtonClick}
                            >
                                <VpnKeyIcon />
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
                                        marginLeft: '',
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

export default Signup