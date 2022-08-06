import React, {Component} from 'react';
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@emotion/react";
import {Autocomplete, Container, CssBaseline, Paper, Stack, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";

class CartManage extends Component {
    render() {
        const theme = createTheme();
        return (
            <>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Container component="main" maxWidth="lg" sx={{mb: 4}}>
                        <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                            <div style={{display: 'flex', justifyContent: 'space-evenly', paddingBottom: '20px'}}>
                                <h1 className={"regHeader"} align="center">
                                    Cart Manage
                                </h1>
                            </div>

                            <div style={{
                                background: 'rgba(211,229,239,0.11)',
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <Grid container sm={8} sx={12} lg={8} md={8} mt={4}>
                                    <ValidatorForm ref="form">
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <Autocomplete
                                                    required
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    fullWidth
                                                    /*  options={this.state.categories}*/
                                                    renderInput={(params) => <TextValidator
                                                        required
                                                        /*    value={this.state.formData.category}*/
                                                        onChange={(e) => {
                                                            /* let data = this.state.formData
                                                             data.category = e.target.value
                                                             this.setState({data})*/
                                                        }}
                                                        {...params} label="Username"/>}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    id="date"
                                                    label="Birthday"
                                                    type="date"
                                                    fullWidth
                                                    defaultValue="2022-8-9"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Autocomplete
                                                    required
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    fullWidth
                                                    renderInput={(params) => <TextValidator
                                                        required
                                                        {...params} label="Product Title"/>}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextValidator
                                                    required
                                                    label="Title"
                                                    fullWidth
                                                    type='number'
                                                    variant="outlined"
                                                    validators={['required', 'isString', 'maxStringLength:25', 'minStringLength:2']}
                                                />
                                            </Grid>
                                        </Grid>
                                    </ValidatorForm>
                                </Grid>
                            </div>
                        </Paper>
                    </Container>
                </ThemeProvider>
            </>
        );
    }
}

export default CartManage;