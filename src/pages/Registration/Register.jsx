import React, {Component} from 'react';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from "@mui/material/Button";
import SnackBar from "../../components/common/snackBar/SnackBar";
import {styleSheet} from "./styles"
import {withStyles} from "@mui/styles";

class Register extends Component {
    render() {
        const {classes} =this.props;
        return (
            <>
                <div className={classes.container}>
                     <Grid  container sm={8} sx={12} lg={8} md={8} mt={4} >
                    <ValidatorForm ref="form" onError={errors => console.log(errors)}>
                        <Typography variant="h6" gutterBottom>
                            Fill Your Data
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextValidator
                                    required
                                    id="name"
                                    name="name"
                                    label="Full Name"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="filled"
                                    validators={['required', 'isString', 'maxStringLength:50', 'minStringLength:2']}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator
                                    required
                                    id="address"
                                    name="address"
                                    label="Address"
                                    fullWidth
                                    autoComplete="shipping address-line1"
                                    variant="standard"
                                    validators={['required', 'isString', 'maxStringLength:50', 'minStringLength:2']}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator
                                    id="contact"
                                    name="contact"
                                    label="Contact"
                                    fullWidth
                                    required
                                    variant="standard"
                                    validators={['required', 'isNumber', 'matchRegexp:^0?(7)[0|1|2|4|5|6|7|8]-?[0-9]{7}$']}
                                    errorMessages={['this field is required', 'Invalid Phone Number']}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator
                                    id="email"
                                    name="email"
                                    label="Email"
                                    required
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                    validators={['required', 'isEmail']}
                                    errorMessages={['this field is required', 'Invalid Email']}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    required
                                    id="password"
                                    name="password"
                                    label="Password"
                                    fullWidth
                                    type="password"
                                    autoComplete="shipping postal-code"
                                    variant="standard"
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
                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    required
                                    id="confirm"
                                    name="confirm"
                                    label="Confirm Password"
                                    fullWidth
                                    type="password"
                                    autoComplete="shipping country"
                                    variant="standard"
                                    validators={['required', 'isString', 'minStringLength:7']}
                                    errorMessages={['this field is required', 'password Not match']}

                                />
                            </Grid>

                        </Grid>
                        <Button type={"submit"}>Save</Button>
                    </ValidatorForm>
                </Grid>
                </div>
                {/*      <SnackBar
                    open={this.state.alert}
                    onClose={() => {
                        this.setState({alert: false})
                    }}
                    message={this.state.message}
                    autoHideDuration={3000}
                    severity={this.state.severity}
                    variant={"filled"}
                />*/}
            </>
        );
    }
}

export default withStyles(styleSheet)(Register) ;