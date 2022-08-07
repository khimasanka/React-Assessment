import React, {Component} from 'react';
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@emotion/react";
import {Autocomplete, Container, CssBaseline, Paper, Select, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import UserService from "../../services/UserService";
import ProductService from "../../services/ProductService";
import Box from "@mui/material/Box";
import Buttons from "@mui/material/Button";

class CartManage extends Component {
    constructor(props) {
        super(props);
        this.state={
            formData:{
                userId:'',
                date:'',
                products:[
                    {
                        productId:'',
                        quantity:''
                    }
                ]
            },
            users:[],
            products:[]
        }
    }

    loadUsers = async () => {
        let res = await UserService.getAllUsers()
        if (res.status===200){
            this.setState({
                users:res.data
            })
        }
    };

    loadProducts = async ()=>{
        let res = await ProductService.getAllProducts();
        if (res.status===200){
            this.setState({
                products:res.data
            })
        }
    }

    submitOrder =()=>{

    }

    clearFields =() =>{
        console.log(this.state.formData)
    }

    componentDidMount = async () => {
        await this.loadUsers();
        await this.loadProducts();
    };

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
                                    <ValidatorForm ref="form" onSubmit={this.submitOrder}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <Autocomplete
                                                    required
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    fullWidth
                                                 /*   value={this.state.formData.products.map((val)=>(val.productId))}
                                                    onChange={(event,newValue)=>{
                                                        console.log(newValue)
                                                        this.setState({
                                                            formData:{
                                                                products:[{
                                                                    productId:newValue
                                                                }]
                                                            }
                                                        });
                                                    }}*/
                                                    value={this.state.formData.userId}
                                                    onChange={((event, value) => {
                                                        const text = value.split('')
                                                        console.log(text[0]);
                                                        this.setState({
                                                            formData:{
                                                                userId:text[0]
                                                            }
                                                        });
                                                    })}
                                                    options={this.state.users.map((ids)=>(ids.id+' '+ids.name.firstname+' '+ids.name.lastname))}
                                                    renderInput={(params) => <TextValidator
                                                        required
                                                        {...params} label="Username"/>
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    id="date"
                                                    label="Date"
                                                    type="date"
                                                    fullWidth
                                                    value={this.state.formData.date}
                                                    onChange={(event => {
                                                        console.log(event.target.value)
                                                        this.setState({
                                                            formData:{
                                                                date:event.target.value
                                                            }
                                                        });
                                                    })}
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
                                                    options={this.state.products.map((title)=>(title.title))}
                                                    value={this.state.formData.products.map((val)=>(val.productId))}
                                                    onChange={(event,newValue)=>{
                                                        const result = this.state.products.find(({title})=> title ===newValue)
                                                        console.log(result.id)
                                                        this.setState({
                                                            formData:{
                                                                products:[{
                                                                    productId:result.id
                                                                }]
                                                            }
                                                        });
                                                    }}
                                                    fullWidth
                                                    renderInput={(params) => <TextValidator
                                                        required
                                                        {...params} label="Product Title"/>}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextValidator
                                                    required
                                                    label="QTY"
                                                    fullWidth
                                                    type='number'
                                                    variant="outlined"
                                                    validators={['required', 'isString', 'maxStringLength:25', 'minStringLength:2']}
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
            </>
        );
    }
}

export default CartManage;