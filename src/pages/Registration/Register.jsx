import React, {Component} from 'react';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from "@mui/material/Button";
import SnackBar from "../../components/common/snackBar/SnackBar";
import {styleSheet} from "./styles"
import {withStyles} from "@mui/styles";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state={
            formData:{

            },
            alert: false,
            message: '',
            btnText:'Save',
        }
    }

    render() {
        const {classes} =this.props;
        return (
            <>
                <div className={classes.container}>
                     <Grid  container sm={8} sx={12} lg={8} md={8} mt={4} >
                    <ValidatorForm ref="form" onError={errors => console.log(errors)}>
                        <Typography variant="h6" gutterBottom>
                            User Registration
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextValidator
                                    required
                                    label="First Name"
                                    fullWidth
                                    variant="filled"
                                    size="small"
                                    autoComplete="given-name"
                                    validators={['required', 'isString', 'maxStringLength:50', 'minStringLength:2']}

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
                                    validators={['required', 'isString', 'maxStringLength:50', 'minStringLength:2']}

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
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextValidator
                                    label="Username"
                                    required
                                    variant="filled"
                                    size="small"
                                    type="email"
                                    fullWidth

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
                                    autoComplete="shipping postal-code"
                                    /*       value={this.state.formData.password}*/
                                    validators={['required', 'isString', 'minStringLength:7']}
                                    errorMessages={['this field is required', 'Password too short']}
                                    /*    onChange={(e) => {
                                            let data = this.state.formData
                                            data.password = e.target.value
                                            this.setState({data})
                                        }}*/
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextValidator
                                    required
                                    label="City"
                                    fullWidth
                                    validators={['required', 'isString', 'minStringLength:7']}
                                    variant="filled"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextValidator
                                    label="Street"
                                    required
                                    fullWidth
                                    variant="filled"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextValidator
                                    label="Street No"
                                    required
                                    fullWidth
                                    variant="filled"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextValidator
                                    label="Zip Code"
                                    required
                                    fullWidth
                                    variant="filled"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextValidator
                                    label="Lat Value"
                                    required
                                    fullWidth
                                    variant="filled"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextValidator
                                    label="Long Value"
                                    required
                                    fullWidth
                                    variant="filled"
                                    size="small"
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
                                />
                            </Grid>

                        </Grid>
                        <Button type={"submit"}>Save</Button>
                    </ValidatorForm>
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

export default withStyles(styleSheet)(Register) ;