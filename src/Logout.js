import AuthContext from "./context/AuthProvider";
import { useContext, useState } from "react";
import axios from "./context/axios";
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router';

const LOGOUT_URL = "api/auth/logout";

const Logout = () => {
    const { setAuth } = useContext(AuthContext);
    const history = useHistory();
    // const { auth } = useContext(AuthContext);
    // console.log(auth);
    try {
        axios.post(LOGOUT_URL, 
            {data: "Request Logout"},
            {   
            headers: {"Content-Type": "application/json"},
            withCredentials: true,
            data: "Request Logout"
            },)
        localStorage.clear();
        return(
        <Redirect to="/" /> 
        )
    } catch (error) {
        console.log(error);
    }
}

export default Logout;