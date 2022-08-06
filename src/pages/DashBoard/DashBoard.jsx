import React, {Component} from 'react';
import Appbar from "../../components/Appbar/Appbar";
import {Outlet} from "react-router-dom";

class DashBoard extends Component {
    render() {
        return (
            <>
                <Appbar/>
                <Outlet/>
            </>
        );
    }
}

export default DashBoard;