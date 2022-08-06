import React, {Component} from 'react';
import ActionAreaCard from "../common/Card/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import product from '../../assets/images/products.png';
import cart from '../../assets/images/cart.svg';
import users from '../../assets/images/usesr.svg';

class MainView extends Component {
    render() {
        return (
            <Container id="driver" maxWidth="lg" sx={{mt: 8, mb: 4}}>
                <Grid container sx={12} spacing={6} justifyContent='center' direction='row' alignItems='center'>
                    <ActionAreaCard
                        image={product}
                        title={'Products'}
                        count={6}
                    />
                    <ActionAreaCard
                        image={cart}
                        title={'Cart'}
                        count={6}
                    />
                    <ActionAreaCard
                        image={users}
                        title={'Users'}
                        count={6}
                    />
                </Grid>
            </Container>
        );
    }
}

export default MainView;