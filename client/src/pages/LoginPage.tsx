import { Box, Button, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import MotionDivWrapper from "../components/MotionDivWrapper";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(disabled) return;

        try {
            setDisabled(true);
            const form = e.currentTarget;
            const formData = new FormData(form);

            const username = formData.get("username");
            const password = formData.get("password");

            const data = {username: username, password: password};

            const response = await axios.post("http://localhost:5000/api/login/", data);
            console.log(response.data);

            navigate("/");
        }

        catch(e) {
            setDisabled(false);
            console.log(e);
        }
    }

    return (
        <MotionDivWrapper>
            <Box display={"flex"} height={"100vh"} justifyContent={"center"} alignItems="center">
                <Paper elevation={3} sx={{ boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.5);",borderRadius: 2, mx: 3, p: 3 }}>
                    
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <Typography variant="h4" textAlign={"center"}>
                                <LockIcon /> Login to your account
                            </Typography>

                            <TextField variant="outlined" label="Username" name="username"
                                required
                                slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    )}}}/> 

                            <TextField variant="outlined" label="Password" name="password"
                                required
                                type="password"
                                slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOpenIcon />
                                        </InputAdornment>
                                    )}}}/>
                            
                            <Button disabled={disabled}
                            type="submit" variant="contained" fullWidth size="large">
                                Submit
                            </Button>
                        </Stack>
                    </form>

                </Paper>
            </Box>
        </MotionDivWrapper>
    )
}