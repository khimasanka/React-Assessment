import React, {Component} from 'react';
import {Autocomplete, CssBaseline, InputLabel, OutlinedInput, Paper, Select} from "@mui/material";
import Container from "@mui/material/Container";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Buttons from "@mui/material/Button";
import {ThemeProvider} from "@emotion/react";
import {createTheme} from "@mui/material/styles";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData:{
                title:'',
                price:'',
                description:'',
                image:null,
                category:''
            },
            categories: [],
            btnText:'Save'
        }
    }

    names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];

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
                                    Products
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
                                                <TextValidator
                                                    required
                                                    label="Title"
                                                    fullWidth
                                                    variant="filled"
                                                    size="small"
                                                    validators={['required', 'isString', 'maxStringLength:25', 'minStringLength:2']}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextValidator
                                                    required
                                                    label="Price"
                                                    fullWidth
                                                    variant="filled"
                                                    size="small"
                                                    validators={['required','isNumber']}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Autocomplete
                                                    required
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    fullWidth
                                                    options={this.names}
                                                    sx={{width: 300}}
                                                    renderInput={(params) => <TextValidator
                                                        required

                                                        {...params} label="Category"/>}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextValidator
                                                    id="outlined-multiline-static"
                                                    label="Multiline"
                                                    fullWidth
                                                    required
                                                    multiline
                                                    rows={4}
                                                    validators={['required', 'isString', 'minStringLength:5']}
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
                                                {this.state.btnText}
                                            </button>
                                        </Box>
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

export default Products;