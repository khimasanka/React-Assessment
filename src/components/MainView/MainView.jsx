import React, {Component} from 'react';
import ActionAreaCard from "../common/Card/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import product from '../../assets/images/products.png';
import cart from '../../assets/images/cart.svg';
import users from '../../assets/images/usesr.svg';
import UserService from "../../services/UserService";
import CartService from "../../services/CartService";

class MainView extends Component {
    constructor(props) {
        super(props);
        this.state={
            productCount:'',
            cartCount:'',
            userCount:''
        }
    }

    getProductCount = async ()=>{
        let res = await UserService.getAllUsers()
        if (res.status === 200){
            this.setState({
                productCount:   res.data.length
            })
        }
    }

    getCartCount = async ()=>{
        let res = await CartService.getAllCarts()
        if (res.status === 200){
            this.setState({
                cartCount:   res.data.length
            })
        }
    }

    getUserCount = async ()=>{
        let res = await UserService.getAllUsers()
        if (res.status === 200){
            this.setState({
                userCount:   res.data.length
            })
        }
    }

    componentDidMount = async ()=> {
        await this.getProductCount();
        await this.getCartCount();
        await this.getUserCount();
    }

    render() {
        return (
            <Container id="driver" maxWidth="lg" sx={{mt: 8, mb: 4}}>
                <Grid container sx={12} spacing={6} justifyContent='center' direction='row' alignItems='center'>
                    <ActionAreaCard
                        image={product}
                        title={'Products'}
                        count={this.state.productCount}
                    />
                    <ActionAreaCard
                        image={cart}
                        title={'Cart'}
                        count={this.state.cartCount}
                    />
                    <ActionAreaCard
                        image={users}
                        title={'Users'}
                        count={this.state.userCount}
                    />
                </Grid>
            </Container>
        );
    }
}

export default MainView;