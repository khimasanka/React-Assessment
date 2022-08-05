import React, {Component} from 'react';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Buttons from "@mui/material/Button";
import SnackBar from "../../components/common/snackBar/SnackBar";
import {styleSheet} from "./styles"
import {withStyles} from "@mui/styles";
import Container from "@mui/material/Container";
import {CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import {createTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import UserService from "../../services/UserService";

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
            data:[],
            alert: false,
            message: '',
            btnText: 'Save',
        }
    }

    submitUser = async () => {
        console.log(this.state.formData)
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
                phone: ''
            }
        });
    }

    getAllUsers = async ()=>{
        let res = await UserService.getAllUsers();
        console.log(res)
        if (res.status === 200) {
            this.setState({
                data: res.data.data
            });
        }
    }

    componentDidMount = async ()=> {
        await this.getAllUsers();
    }

    createData(name, calories, fat, carbs, protein) {
        return {name, calories, fat, carbs, protein};
    }

    rows = [
        this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        this.createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        this.createData('Eclair', 262, 16.0, 24, 6.0),
        this.createData('Cupcake', 305, 3.7, 67, 4.3),
        this.createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

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
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Dessert (100g serving)</TableCell>
                                        <TableCell align="right">Calories</TableCell>
                                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                            <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell>
                                        </TableRow>
                                    ))}
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
            </>
        );
    }
}

export default withStyles(styleSheet)(Register);