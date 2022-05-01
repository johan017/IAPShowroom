import { useEffect, useState} from 'react';
import axios from "../context/axios";

var EVENTS_URL = "api/showroom/schedule/events"

const useFetchEvents = (flag) => {

    const [events, setEvents] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setLoading] = useState(false);

    console.log(flag);
    if(flag === "all"){
        EVENTS_URL = "api/showroom/schedule/events?all=true"
        console.log(EVENTS_URL)
    }

    const getEvents = async() =>{
        try{
        const result = await axios.get(EVENTS_URL, 
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }) 
        setEvents(result.data.payload);
        } catch(error) {
            console.error(error.response.status);
            if(error.response.status = '401'){
               //setRedirect(true);
            }
        }
        setLoading(false);
    };

    useEffect(()=>{
        getEvents();
    }, []);

    return {
        events,
        redirect,
        isLoading
      };
};

export default useFetchEvents;
