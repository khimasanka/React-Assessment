import React, {Component} from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import Grid from "@mui/material/Grid";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Buttons from "@mui/material/Button";
import SnackBar from "../../components/common/snackBar/SnackBar";
import {styleSheet} from "./styles"
import {withStyles} from "@mui/styles";
import Container from "@mui/material/Container";
import {
    CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Tooltip
} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import {createTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import UserService from "../../services/UserService";
import Button from "@mui/material/Button";

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
                deleteId:''
            }
        });
    }

    getAllUsers = async () => {
        let res = await UserService.getAllUsers();
        if (res.status === 200) {
            this.setState({
                data: res.data
            });
        }
    }

    componentDidMount = async () => {
        await this.getAllUsers();
        console.log(this.state.data)
    }

    openDialog = () => {
        this.setState({
            open: true
        });
    };

    deleteById = async () => {
        let res = await UserService.removeUser(this.state.deleteId);
        console.log(res)
        if (res.status === 200) {
            await this.getAllUsers();
            this.setState({
                open: false
            });
        } else {
            console.log('can not')
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
                            <h1 className={"regHeader"} align="center">
                                User Registration
                            </h1>

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
                                                    validators={['required', 'isString', 'maxStringLength:5', 'minStringLength:1']}
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
                                                    validators={['required', 'isNumber', 'maxNumber:99999', 'matchRegexp:^[0-9]{5}$']}
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
                                                    validators={['required', 'isNumber', 'matchRegexp:^0?(7)[0|1|2|4|5|6|7|8]-?[0-9]{7}$']}
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

                <div className={classes.container}>
                    <Grid container md={10} sm={11}>
                        <TableContainer component={Paper} sx={{maxHeight: 440}}>
                            <Table stickyHeader sx={{minWidth: 650}} size="small" aria-label="User Details">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Actions</TableCell>
                                        <TableCell align="center">Id</TableCell>
                                        <TableCell align="center">Full name</TableCell>
                                        <TableCell align="center">City</TableCell>
                                        <TableCell align="center">street</TableCell>
                                        <TableCell align="center">number</TableCell>
                                        <TableCell align="center">Zip code</TableCell>
                                        <TableCell align="center">lat</TableCell>
                                        <TableCell align="center">Long</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Username</TableCell>
                                        <TableCell align="center">Password</TableCell>
                                        <TableCell align="center">Phone</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.data.map((row) => (
                                            <TableRow
                                            >
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton onClick={() => {
                                                            this.setState({deleteId: row.id})
                                                            this.openDialog()
                                                        }}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>{row.id}</TableCell>
                                                <TableCell>{`${row.name.firstname}` + ' ' + `${row.name.lastname}`}</TableCell>
                                                <TableCell>{row.address.city}</TableCell>
                                                <TableCell>{row.address.street}</TableCell>
                                                <TableCell>{row.address.number}</TableCell>
                                                <TableCell>{row.address.zipcode}</TableCell>
                                                <TableCell>{row.address.geolocation.lat}</TableCell>
                                                <TableCell>{row.address.geolocation.long}</TableCell>
                                                <TableCell>{row.email}</TableCell>
                                                <TableCell>{row.username}</TableCell>
                                                <TableCell>{row.password}</TableCell>
                                                <TableCell>{row.phone}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </div>
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
                            are you sure..! Deleting this User permanently deletes all records related to it.
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