import React, {Component} from 'react';
import {Autocomplete, CssBaseline, FormLabel, InputLabel, OutlinedInput, Paper, Select} from "@mui/material";
import Container from "@mui/material/Container";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Buttons from "@mui/material/Button";
import {ThemeProvider} from "@emotion/react";
import {createTheme} from "@mui/material/styles";
import ProductService from "../../services/ProductService";
import Avatar from "@mui/material/Avatar";
import SnackBar from "../common/snackBar/SnackBar";

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
            btnText:'Save',
            image:null,
            alert: false,
            message: '',
            severity: 'success'
        }
    }

    getProduct =async ()=>{
        let res = await ProductService.getAllCategories();
        if (res.status === 200){
            this.setState({
                categories:res.data
            })
        }
    }

    saveProduct =async ()=>{
        this.state.formData.image = this.state.image
        let data = this.state.formData
        let res = await ProductService.saveProduct(data);
        if (res.status === 200){
            this.setState({
                alert: true,
                message: 'Save Success',
                severity: 'success'
            })
        }else{
            this.setState({
                alert: true,
                message: 'Something Went Wrong',
                severity: 'error'
            });
        }
    }

    componentDidMount = async () => {
        await this.getProduct()
    }

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
                                    <ValidatorForm ref="form" onSubmit={this.saveProduct}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <TextValidator
                                                    required
                                                    label="Title"
                                                    fullWidth
                                                    variant="filled"
                                                    size="small"
                                                    validators={['required', 'isString', 'maxStringLength:25', 'minStringLength:2']}
                                                    value={this.state.formData.title}
                                                    onChange={(e) => {
                                                        let data = this.state.formData
                                                        data.title = e.target.value
                                                        this.setState({data})
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextValidator
                                                    required
                                                    label="Price"
                                                    fullWidth
                                                    variant="filled"
                                                    size="small"
                                                    value={this.state.formData.price}
                                                    validators={['required', 'isFloat', 'matchRegexp:^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\\.[0-9]{2,2})?$']}
                                                    onChange={(e) => {
                                                        let data = this.state.formData
                                                        data.price = e.target.value
                                                        this.setState({data})
                                                    }}

                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Autocomplete
                                                    required
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    fullWidth
                                                    options={this.state.categories}
                                                    renderInput={(params) => <TextValidator
                                                        required
                                                        value={this.state.formData.category}
                                                        onChange={(e) => {
                                                            let data = this.state.formData
                                                            data.category = e.target.value
                                                            this.setState({data})
                                                        }}
                                                        {...params} label="Category"/>}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <TextValidator
                                                    id="outlined-multiline-static"
                                                    label="Description"
                                                    fullWidth
                                                    required
                                                    multiline
                                                    rows={4}
                                                    validators={['required', 'isString', 'minStringLength:5']}
                                                    value={this.state.formData.description}
                                                    onChange={(e) => {
                                                        let data = this.state.formData
                                                        data.description = e.target.value
                                                        this.setState({data})
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6} >
                                                <FormLabel htmlFor={"image"} sx={{paddingBottom:1}} component="legend">Choose Image</FormLabel>
                                                <input
                                                    required
                                                    id="image"
                                                    name="file"
                                                    type="file"
                                                    value={this.state.formData.image}
                                                    onChange={(e)=>{
                                                        if (e.target.files && e.target.files[0]) {
                                                            this.setState({
                                                                image: URL.createObjectURL(e.target.files[0])
                                                            });
                                                        }
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={4} md={3}>
                                                <Avatar
                                                    alt="Image"
                                                    src={this.state.image}
                                                    sx={{ width: 100, height: 100 }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                            <Buttons
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

export default Products;