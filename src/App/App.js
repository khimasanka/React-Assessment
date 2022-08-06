import React from "react";
import './App.css';
import Login from "../pages/login/login";
import HomePage from "../pages/Home/HomePage";
import {Route, Routes} from "react-router-dom";
import Register from "../pages/Registration/Register";
import NotFound from "../pages/404Page/NotFound";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login/>} exact/>
            <Route path="*" element={<NotFound/>} exact/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    );
}

export default App;
