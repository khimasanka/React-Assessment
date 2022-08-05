import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Component} from "react";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import LoginService from "../../services/LoginService";
import localStorageService from "../../LocalStorageService"

const theme = createTheme();
class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            formData:{
                username:'',
                password:''
            }
        }
    }

    handleSubmit = async () => {
        let data = this.state.formData
        let res = await LoginService.loginUser(data);
        if (res.status === 200) {
            const accessToken = res.data.token
            localStorageService.setItem('accessToken',accessToken)
        } else {
            console.log('wrong');
        }

    }

    render() {

        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" style={{width:600}}>
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
                        <ValidatorForm style={{width:350,marginTop:3}}  ref="form" onSubmit={this.handleSubmit} >
                            <TextValidator
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={this.state.formData.username}
                                autoFocus
                                onChange={(e) => {
                                    let data = this.state.formData
                                    data.username = e.target.value
                                    this.setState({data})
                                }}
                            />
                            <TextValidator
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={this.state.formData.password}
                                onChange={(e) => {
                                    let data = this.state.formData
                                    data.password = e.target.value
                                    this.setState({data})
                                }}
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary"/>}
                                label="Remember me"
                            />
                            <Button type="submit"
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
                                        Create New Account
                                    </Link>
                                </Grid>
                            </Grid>
                        </ValidatorForm>
                    </Box>

                </Container>
            </ThemeProvider>
        );
    }
}

export default Login