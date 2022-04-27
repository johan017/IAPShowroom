import { useEffect, useState} from 'react';
import axios from "../context/axios";

const EVENTS_URL = "api/auth/user-info"

const useFetchUserInfo = () => {

    const [userInfo, setUserInfo] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const getUserInfo = async() =>{
        try{
        const result = await axios.get(EVENTS_URL, 
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) 
        setUserInfo(result.data.payload);
        console.log(result.data.payload)
        } catch(error) {
            console.error(error.response.status);
            if(error.response.status = '401'){
                setRedirect(true);
            }
        }
        setLoading(false);
    };

    useEffect(()=>{
        getUserInfo();
    }, []);

    return {
        userInfo,
        redirect,
        isLoading
      };
};

export default useFetchUserInfo;
