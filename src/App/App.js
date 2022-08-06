import React from "react";
import './App.css';
import Login from "../pages/login/login";
import {Route, Routes} from "react-router-dom";
import Register from "../pages/Registration/Register";
import NotFound from "../pages/404Page/NotFound";
import DashBoard from "../pages/DashBoard/DashBoard";
import MainView from "../components/MainView/MainView";
import Products from "../components/Products/Products";
import CartManage from "../components/Cart/CartManage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login/>} exact/>
            <Route path="*" element={<NotFound/>} exact/>
            <Route path="/register" element={<Register/>}/>
            <Route exact  path="/dashboard" element={<DashBoard/>}>
                <Route index element={<MainView/>}/>
                <Route path="products" element={<Products/>}/>
                <Route path="cart" element={<CartManage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
