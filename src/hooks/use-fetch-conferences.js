import { useEffect, useState} from 'react';
import axios from "../context/axios";

var CONFERENCES_URL = "api/showroom/conference"

const useFetchConferences = (flag) => {

    const [conferences, setConferences] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const getConferences = async() =>{
        try{
        const result = await axios.get(CONFERENCES_URL, 
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) 
        setConferences(result.data.payload);
        console.log("url_used", CONFERENCES_URL)

        } catch(error) {
            console.error(error.response.status);
            if(error.response.status = '401'){
            }
        }
        setLoading(false);
    };

    useEffect(()=>{
        getConferences();
    }, []);

    return {
        conferences,
        redirect,
        isLoading
      };
};

export default useFetchConferences;
