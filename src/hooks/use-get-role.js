import {useEffect, useState} from 'react';
import axios from "../context/axios";
const ROLE_URL = "api/auth/user-info"

const useGetRole = () => {
    const [isLoading, setLoading] = useState(true);
    const [role, setRole] = useState();
    const [uID, setuID] = useState();

    const getRole = async() =>{
        try{
            const result = await axios.get(ROLE_URL, 
                {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true
                });
                setRole(result.data.payload.user_role);
                setuID(result.data.payload.adminid);
                setLoading(false);
               // setLoading(false);
        }catch(err){
            setRole(null); 
        }
    };

    useEffect(()=>{
        getRole();
    }, []);

    return {
        role,
        uID
      };
};

export default useGetRole;
