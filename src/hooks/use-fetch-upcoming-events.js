import { useEffect, useState} from 'react';
import axios from "../context/axios";

const EVENTS_URL = "/api/showroom/schedule/events"

const useFetchUpcomingEvents = () => {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const getEvents = async() =>{
        try{
            const result = await axios.get(EVENTS_URL, 
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
                params: {
                    upcoming: true,
                    date: new Date().toLocaleDateString("en-US"),
                    time: new Date().toLocaleTimeString("en-US")
                }
            });
            setEvents(result.data.payload);
            console.log(result.data.payload);
            } catch(error) {
                console.error(error)
            }
            setLoading(false);
    };

    useEffect(()=>{
        getEvents();
    }, []);

    return {
        events,
        loading
      };
};

export default useFetchUpcomingEvents;
