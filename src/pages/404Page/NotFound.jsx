import React, {Component} from 'react';
import Image from '../../assets/images/404 err.gif'
import Button from "@mui/material/Button";


class NotFound extends Component {
    render() {
        return (
            <div style={{display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center'}}>
                <div >
                    <img width={500} src={Image} alt="404"/>
                </div>
                <h1>OOPS! page not found...</h1>
                <Button href="/" sx={{paddingTop:'20px'}} > Go Back</Button>
            </div>

    )

    }
}

export default NotFound;