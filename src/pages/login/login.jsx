import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Component, useState} from "react";

const theme = createTheme();

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:''
        }
    }


    render() {
        const handleSubmit = async () => {
            console.log('res');
        };

        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} Validate sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={this.state.username}
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => {
                                    this.setState({
                                        username:e.target.value
                                    })
                                    console.log(this.state.username)
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={this.state.password}
                                onChange={(e) => {
                                    this.setState({
                                        password:e.target.value
                                    })
                                }}
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary"/>}
                                label="Remember me"
                            />
                            <Button href={"/adminDash"}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                            >
                                Sign In
                            </Button>
                            <Grid container style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}>
                                <Grid item xs>
                                    <Link href="" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                </Container>
            </ThemeProvider>
        );
    }
}

export default Login