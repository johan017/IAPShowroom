import { SliderTrack } from '@mui/material';
import { useEffect, useState} from 'react';
import axios from "../context/axios";

const ROLE_URL = "api/auth/user-info"

const useGetRole = () => {
    const [isLoading, setLoading] = useState(true);
    const [role, setRole] = useState([]);

    const getRole = async() =>{
        try{
            const result = await axios.get(ROLE_URL, 
                {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true
                });
                console.log(result.data.payload.user_role);
                setRole(result);
               // setLoading(false);
        }catch(err){
            console.log(err);
            console.log("Unauthorized")
        }
    };

    useEffect(()=>{
        getRole();
    }, []);

    return {
        role,
        isLoading
      };
};

export default useGetRole;
