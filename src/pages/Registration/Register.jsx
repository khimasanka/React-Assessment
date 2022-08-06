import React, {Component} from 'react';
import Grid from "@mui/material/Grid";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Buttons from "@mui/material/Button";
import SnackBar from "../../components/common/snackBar/SnackBar";
import {styleSheet} from "./styles"
import {withStyles} from "@mui/styles";
import Container from "@mui/material/Container";
import {
    CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Paper,
} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import {createTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import UserService from "../../services/UserService";
import Button from "@mui/material/Button";
import UserTable from "../../components/UserTable/UserTable";
import SearchIcon from '@mui/icons-material/Search';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                email: '',
                username: '',
                password: '',
                name: {
                    firstname: '',
                    lastname: ''
                },
                address: {
                    city: '',
                    street: '',
                    number: '',
                    zipcode: '',
                    geolocation: {
                        lat: '',
                        long: ''
                    }
                },
                phone: ''
            },
            data: [],
            alert: false,
            message: '',
            btnText: 'Save',
            searchId: ''
        }
    }

    submitUser = async () => {
        let data = this.state.formData
        let res = await UserService.userRegister(data);
        if (res.status === 200) {
            this.clearFields();
            this.setState({
                alert: true,
                message: 'Register Success',
                severity: 'success'
            });
        } else {
            this.setState({
                alert: true,
                message: 'Register Failed..! Try again',
                severity: 'warning'
            });
        }
    }

    clearFields = () => {
        this.setState({
            formData: {
                email: '',
                username: '',
                password: '',
                name: {
                    firstname: '',
                    lastname: ''
                },
                address: {
                    city: '',
                    street: '',
                    number: '',
                    zipcode: '',
                    geolocation: {
                        lat: '',
                        long: ''
                    }
                },
                phone: '',
                open: false,
                deleteId: ''
            }
        });
    }

    updateUser = (data) => {
        this.setState({
            formData: {
                email: data.email,
                username: data.username,
                password: data.password,
                name: {
                    firstname: data.name.firstname,
                    lastname: data.name.firstname
                },
                address: {
                    city: data.address.city,
                    street: data.address.street,
                    number: data.address.number,
                    zipcode: data.address.zipcode,
                    geolocation: {
                        lat: data.address.geolocation.lat,
                        long: data.address.geolocation.long
                    }
                },
                phone: data.phone
            }
        })
    }

    searchUser = async () => {
        if (this.state.searchId === '') {
            this.setState({
                alert: true,
                message: 'Please Enter User Id',
                severity: 'error'
            });
        } else {
            let res = await UserService.searchUser(this.state.searchId);
            if (res.status === 200) {
                if (res.data === null){
                    this.setState({
                        alert: true,
                        message: 'User Id is Invalid',
                        severity: 'warning'
                    });
                }else {
                    this.setState({
                        formData: {
                            email: res.data.email,
                            username: res.data.username,
                            password: res.data.password,
                            name: {
                                firstname: res.data.name.firstname,
                                lastname: res.data.name.lastname
                            },
                            address: {
                                city: res.data.address.city,
                                street: res.data.address.city,
                                number: res.data.address.number,
                                zipcode: res.data.address.zipcode,
                                geolocation: {
                                    lat: res.data.address.geolocation.lat,
                                    long: res.data.address.geolocation.long
                                }
                            },
                            phone: res.data.phone
                        }
                    })
                }
            }
        }
    }

    render() {
        const theme = createTheme();
        const {classes} = this.props;
        return (
            <>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Container component="main" maxWidth="lg" sx={{mb: 4}}>
                        <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>

                            <div style={{display: 'flex', justifyContent: 'space-evenly', paddingBottom: '20px'}}>
                                <h1 className={"regHeader"} align="center">
                                    User Registration
                                </h1>
                                <ValidatorForm ref="form" style={{width: '20%'}}>
                                    <TextValidator
                                        variant="standard"
                                        color="success"
                                        focused
                                        size="small"
                                        label="Search Drivers"
                                        value={this.state.formData.searchId}
                                        InputProps={{
                                            startAdornment: (
                                                <Button type="submit" position="end"
                                                        onClick={async () => {
                                                            await this.searchUser();
                                                        }}>
                                                    <SearchIcon/>
                                                </Button>
                                            ),
                                        }}
                                        onChange={(e) => {
                                            let data = this.state
                                            data.searchId = e.target.value
                                            this.setState({data})
                                        }}

                                    />
                                </ValidatorForm>
                            </div>

                            <div className={classes.container} style={{background: 'rgba(211,229,239,0.11)'}}>
                                <Grid container sm={8} sx={12} lg={8} md={8} mt={4}>
                                    <ValidatorForm ref="form" onSubmit={this.submitUser}
                                                   onError={() => {
                                                       this.setState({
                                                           alert: true,
                                                           message: 'Something went wrong..!',
                                                           severity: 'error'
                                                       });
                                                   }}>

                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <TextValidator
                                                    required
                                                    label="First Name"
                                                    fullWidth
                                                    variant="filled"
                                                    size="small"
                                                    autoComplete="given-name"
                                                    validators={['required', 'isString', 'maxStringLength:20', 'minStringLength:2']}
                                                    value={this.state.formData.name.firstname}
                                                    onChange={(e) => {
                                                        let data = this.state.formData.name
                                                        data.firstname = e.target.value
                                                        this.setState({data});
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextValidator
                                                    required
                                                    label="Last Name"
                                                    fullWidth
                                                    variant="filled"
                                                    size="small"
                                                    autoComplete="given-name"
                                                    validators={['required', 'isString', 'maxStringLength:20', 'minStringLength:2']}
                                                    value={this.state.formData.name.lastname}
                                                    onChange={(e) => {
                                                        let data = this.state.formData.name
                                                        data.lastname = e.target.value
                                                        this.setState({data});
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextValidator
                                                    label="Email"
                                                    fullWidth
                                                    variant="filled"
                                                    size="small"
                                                    required
                                                    type="email"
                                                    validators={['required', 'isEmail']}
                                                    errorMessages={['this field is required', 'Invalid Email']}
                                                    value={this.state.formData.email}
                                                    onChange={(e) => {
                                                        let data = this.state.formData
                                                        data.email = e.target.value
                                                        this.setState({data});
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextValidator
                                                    label="Username"
                                                    required
                                                    variant="filled"
                                                    size="small"
                                                    fullWidth
                                                    validators={['required', 'isString', 'maxStringLength:20', 'minStringLength:5']}
                                                    value={this.state.formData.username}
                                                    onChange={(e) => {
                                                        let data = this.state.formData
                                                        data.username = e.target.value
                                                        this.setState({data});
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextValidator
                                                    required
                                                    id="password"
                                                    variant="filled"
                                                    size="small"
                                                    name="password"
                                                    label="Password"
                                                    fullWidth
                                                    type="password"
                                                    validators={['required', 'isString', 'minStringLength:5']}
                                                    errorMessages={['this field is required', 'Password too short']}
                                                    value={this.state.formData.password}
                                                    onChange={(e) => {
                                                        let data = this.state.formData
                                                        data.password = e.target.value
                                                        this.setState({data});
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextValidator
                                                    required
                                                    label="City"
                                                    fullWidth
                                                    validators={['required', 'isString', 'minStringLength:4', 'maxStringLength:20']}
                                                    variant="filled"
                                                    size="small"
                                                    value={this.state.formData.address.city}
                                                    onChange={(e) => {
                                                        let data = this.state.formData.address
                                                        data.city = e.target.value
                                                        this.setState({data});
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextValidator
                                                    label="Street"
                                                    required
                                                    fullWidth
                                                    variant="filled"
                                                    size="small"
                                                    validators={['required', 'isString', 'maxStringLength:20', 'minStringLength:4']}
                                                    value={this.state.formData.address.street}
                                                    onChange={(e) => {
                                                        let data = this.state.formData.address
                                                        data.street = e.target.value
                                                        this.setState({data});
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextValidator
                                                    label="Street No"
                                                    required
                                                    fullWidth
                                                    variant="filled"
                                                    validators={['required', 'isNumber', 'minNumber:1']}
                                                    size="small"
                                                    value={this.state.formData.address.number}
                                                    onChange={(e) => {
                                                        let data = this.state.formData.address
                                                        data.number = e.target.value
                                                        this.setState({data});
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextValidator
                                                    label="Zip Code"
                                                    required
                                                    fullWidth
                                                    variant="filled"
                                                    validators={['required', 'isString', 'minStringLength:3']}
                                                    size="small"
                                                    value={this.state.formData.address.zipcode}
                                                    onChange={(e) => {
                                                        let data = this.state.formData.address
                                                        data.zipcode = e.target.value
                                                        this.setState({data});
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextValidator
                                                    label="Lat Value"
                                                    required
                                                    fullWidth
                                                    variant="filled"
                                                    size="small"
                                                    value={this.state.formData.address.geolocation.lat}
                                                    validators={['required', 'isFloat']}
                                                    onChange={(e) => {
                                                        let data = this.state.formData.address.geolocation
                                                        data.lat = e.target.value
                                                        this.setState({data});
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextValidator
                                                    label="Long Value"
                                                    required
                                                    fullWidth
                                                    variant="filled"
                                                    size="small"
                                                    value={this.state.formData.address.geolocation.long}
                                                    validators={['required', 'isFloat']}
                                                    onChange={(e) => {
                                                        let data = this.state.formData.address.geolocation
                                                        data.long = e.target.value
                                                        this.setState({data});
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <TextValidator
                                                    label="Mobile No"
                                                    required
                                                    variant="filled"
                                                    size="small"
                                                    fullWidth
                                                    /*  validators={['required', 'isNumber', 'matchRegexp:^0?(7)[0|1|2|4|5|6|7|8]-?[0-9]{7}$']}*/
                                                    validators={['required', 'isString', 'minStringLength:10']}
                                                    errorMessages={['this field is required', 'Invalid Phone Number']}
                                                    value={this.state.formData.phone}
                                                    onChange={(e) => {
                                                        let data = this.state.formData
                                                        data.phone = e.target.value
                                                        this.setState({data});
                                                    }}
                                                />
                                            </Grid>

                                        </Grid>
                                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                            <Buttons onClick={this.clearFields}
                                                     sx={{mt: 3, ml: 1, fontSize: 15, fontWeight: "bold"}}
                                                     color="secondary">
                                                Clear
                                            </Buttons>
                                            <button className={'saveBtn'} type="submit" style={{mt: 3, ml: 1}}>
                                                Save
                                            </button>
                                        </Box>
                                    </ValidatorForm>
                                </Grid>
                            </div>
                        </Paper>
                    </Container>
                </ThemeProvider>

                <UserTable/>

                <SnackBar
                    open={this.state.alert}
                    onClose={() => {
                        this.setState({alert: false})
                    }}
                    message={this.state.message}
                    autoHideDuration={3000}
                    severity={this.state.severity}
                    variant={"filled"}
                />
                <Dialog
                    open={this.state.open}
                    onClose={() => {
                        this.setState({open: false})
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Do you want to Delete this User?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are You Sure You Want to Delete {this.state.deleteId}..!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.setState({open: false})
                        }}>Cancel
                        </Button>
                        <Button onClick={this.deleteById} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export default withStyles(styleSheet)(Register);