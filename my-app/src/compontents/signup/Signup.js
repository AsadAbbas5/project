import React, { useState } from "react";
import { Avatar, Typography, TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import axios from "axios";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { Link } from "react-router-dom";

function SignUp() {
    const [userName, setuserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            "&:hover": {
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
        if (!userName || !email || !password || !confirmPassword) {
            alert("Fill Your Input");
        } else {
            const data = {
                userName,
                email,
                password,
                confirmPassword,
            };
            axios
                .post("/api/user/signup", data)
                .then((res) => console.log(res))
                .catch((error) => {
                    console.log(error);
                });
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
        <Box
            justifyContent="center"
            alignItems="center"
            display="flex"
            marginTop={"2rem"}
        >
            <Box
                bgcolor={"#fff"}
                width="20rem"
                padding={"2rem"}
                borderRadius="1rem"
                sx={{
                    border: "2px solid red",
                }}
            >
                <Box marginTop={"6rem"} textAlign={"center"}>
                    <Avatar sx={{ marginLeft: "9rem" }} />
                    <br />
                    <Typography fontSize={"2rem"} fontWeight={600}>
                        SignUp
                    </Typography>
                </Box>
                <Box>
                    <TextField
                        placeholder="Enter Your Name..."
                        label="Name"
                        variant="standard"
                        size="small"
                        type="name"
                        fullWidth
                        value={userName}
                        onChange={(e) => setuserName(e.target.value)}
                    />
                </Box>
                <Box margin={"1rem 0"}>
                    <TextField
                        placeholder="Enter Your Email..."
                        label="Email"
                        variant="standard"
                        size="small"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>
                <Box margin={"1rem 0"}>
                    <TextField
                        placeholder="Enter Your Password..."
                        label="Password"
                        variant="standard"
                        size="small"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>
                <Box margin={"1rem 0"}>
                    <TextField
                        placeholder="Enter Your ConformPassword..."
                        label="Conform Password"
                        variant="standard"
                        size="small"
                        type="Password"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Box>
                <Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ m: 1, position: "relative", marginLeft: "7rem" }}>
                            <Button
                                variant="contained"
                                sx={buttonSx}
                                disabled={loading}
                                onClick={handleButtonClick}
                            >
                                SignUp
                            </Button>
                           
                            <Box  marginTop={"1rem"}>
                               
                                <Typography color={"blue"} marginRight={"2rem"}>
                                    alreaday have acount ...?
                                </Typography>
                                <Link to={"/"}>
                                    Sign In
                                </Link>
                            </Box>
                            {loading && (
                                <CircularProgress
                                    size={20}
                                    sx={{
                                        color: green[500],
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        marginTop: "-12px",
                                        marginLeft: "-12px",
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
export default SignUp;