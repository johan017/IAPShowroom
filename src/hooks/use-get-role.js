import { useEffect ,useLayoutEffect, useState} from 'react';
import axios from "../context/axios";
import { Route, Redirect } from "react-router-dom";
const ROLE_URL = "api/auth/user-info"

const useGetRole = (callback) => {
    const [isLoading, setLoading] = useState(true);
    const [role, setRole] = useState([]);

    const getRole = async() =>{
        try{
            const result = await axios.get(ROLE_URL, 
                {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true
                });
                setRole(result.data.payload.user_role);
                setLoading(false);
               // setLoading(false);
        }catch(err){
            setRole(null); 
        }
    };

    useLayoutEffect(()=>{
        getRole();
    }, []);

    return {
        role,
        isLoading
      };
};

export default useGetRole;
