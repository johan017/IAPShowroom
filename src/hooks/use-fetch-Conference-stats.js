import { useEffect, useState} from 'react';
import axios from "../context/axios";

const CONF_STATS_URL = "api/showroom/stats"

const useFetchConferenceStats = () => {

    const [conferenceStats, setConferenceStats] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const getConferenceStats = async() =>{
        try{
        const result = await axios.get(CONF_STATS_URL, 
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) 
        setConferenceStats(result.data.payload);
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
        getConferenceStats();
    }, []);

    return {
        conferenceStats,
        redirect,
        isLoading
      };
};

export default useFetchConferenceStats;
